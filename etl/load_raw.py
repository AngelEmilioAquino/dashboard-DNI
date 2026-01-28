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


def load_csv_to_raw(csv_path, table_name):
    df = pd.read_csv(csv_path)

    df.to_sql(
        table_name,
        engine,
        if_exists="append",
        index=False
    )

    print(f"Datos cargados en {table_name}")


if __name__ == "__main__":
    load_csv_to_raw("clientes.csv", "clientes_raw")
    load_csv_to_raw("ventas.csv", "ventas_raw")