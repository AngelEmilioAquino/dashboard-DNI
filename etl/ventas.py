import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote_plus

# Config DB
PASSWORD = quote_plus("YourStrongPasswordHere")
DATABASE_URL = (
    f"postgresql+psycopg2://"
    f"postgres.wsizxuskxyozvoakfe:{PASSWORD}"
    f"@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
)
engine = create_engine(DATABASE_URL)

# Cargar RAW
ventas = pd.read_sql("SELECT * FROM ventas_raw", engine)

# Normalizar textos
for col in ventas.select_dtypes(include="object").columns:
    ventas[col] = ventas[col].astype(str).str.strip().str.upper()

# Normalizar fechas
ventas["fecha"] = pd.to_datetime(ventas["fecha"], errors="coerce")

# Convertir total a numérico
ventas["total"] = pd.to_numeric(ventas["total"], errors="coerce")

# ==============================
# Detectar errores y asignar motivo
ventas["error_motivo"] = None

ventas.loc[ventas["venta_id"].isna(), "error_motivo"] = "VENTA_ID_NULO"
ventas.loc[ventas["cliente_id"].isna(), "error_motivo"] = "CLIENTE_ID_NULO"
ventas.loc[ventas["fecha"].isna(), "error_motivo"] = "FECHA_INVALIDA"
ventas.loc[ventas["total"].isna(), "error_motivo"] = "TOTAL_INVALIDO"
ventas.loc[ventas["total"] < 0, "error_motivo"] = "TOTAL_NEGATIVO"

# Separar clean de errors
ventas_errors = ventas[ventas["error_motivo"].notna()]
ventas_clean = ventas[ventas["error_motivo"].isna()]

# Limpi columnas para DB
ventas_errors = ventas_errors[
    ["venta_id", "cliente_id", "fecha", "total", "moneda", "canal", "error_motivo"]
]

ventas_clean = ventas_clean[
    ["venta_id", "cliente_id", "fecha", "total", "moneda", "canal"]
]

# rellenamos datos en ventas tanto en fechas como en totales
ventas_clean["fecha"] = ventas_clean["fecha"].fillna("1900-01-01")
ventas_clean["total"] = ventas_clean["total"].fillna(0)

for col in ventas_clean.select_dtypes(include="object").columns:
    ventas_clean[col] = ventas_clean[col].replace("", "DESCONOCIDO")

# Guardar en DB
ventas_clean.to_sql(
    "ventas",
    engine,
    if_exists="replace",
    index=False
)

ventas_errors.to_sql(
    "ventas_errors",
    engine,
    if_exists="replace",
    index=False
)

print("Ventas procesadas correctamente")
print(f"{len(ventas_clean)} registros limpios")
print(f"{len(ventas_errors)} registros con errores")
