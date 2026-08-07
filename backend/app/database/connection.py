import os

from dotenv import load_dotenv
from sqlalchemy import create_engine

# Load variables from the .env file
load_dotenv()

# Read database settings
DB_HOST = os.getenv("DATABASE_HOST")
DB_PORT = os.getenv("DATABASE_PORT")
DB_NAME = os.getenv("DATABASE_NAME")
DB_USER = os.getenv("DATABASE_USER")
DB_PASSWORD = os.getenv("DATABASE_PASSWORD")

# Build the MySQL connection URL
DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# Create the SQLAlchemy Engine
engine = create_engine(
    DATABASE_URL,
    echo=True
)