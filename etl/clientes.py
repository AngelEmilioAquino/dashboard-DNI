
import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote_plus

PASSWORD = quote_plus("YourStrongPasswordHere")
DATABASE_URL = (
    f"postgresql+psycopg2://"
    f"postgres.wsizxuskxyozvoakfe:{PASSWORD}"
    f"@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
)
engine = create_engine(DATABASE_URL)

# Leer RAW
clientes = pd.read_sql("SELECT * FROM clientes_raw", engine)

# Normalizar textos
for col in clientes.select_dtypes(include="object").columns:
    clientes[col] = clientes[col].astype(str).str.strip().str.upper()

# Normalizar fechas
if "fecha_registro" in clientes.columns:
    clientes["fecha_registro"] = pd.to_datetime(
        clientes["fecha_registro"],
        errors="coerce"
    )

# Detectar errores
clientes["error"] = False

clientes.loc[clientes["cliente_id"].isna(), "error"] = True

if "fecha_registro" in clientes.columns:
    clientes.loc[clientes["fecha_registro"].isna(), "error"] = True

# Separar
clientes_errors = clientes[clientes["error"] == True]
clientes_clean = clientes[clientes["error"] == False].drop(columns=["error"])

# sin nulos
clientes_clean["fecha_registro"] = clientes_clean["fecha_registro"].fillna("1900-01-01")

for col in clientes_clean.select_dtypes(include="object").columns:
    clientes_clean[col] = clientes_clean[col].replace("", "DESCONOCIDO")

# Guardar
clientes_clean.to_sql(
    "clientes",
    engine,
    if_exists="append",
    index=False
)

clientes_errors.to_sql(
    "clientes_errors",
    engine,
    if_exists="append",
    index=False
)

print("Clientes procesados correctamente")
