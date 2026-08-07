from app.database.base import Base
from app.database.connection import engine

# Import all models
from app.models import *

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ All tables created successfully!")