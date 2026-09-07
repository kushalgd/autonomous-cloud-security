from app.database.base import Base
from app.database.connection import engine

# Import models so SQLAlchemy registers them
from app.models.user import User
from app.models.incident import Incident


print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully!")