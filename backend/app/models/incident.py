from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone

from app.database.base import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    threat = Column(String(255), nullable=False)

    severity = Column(String(50), nullable=False)

    source_ip = Column(String(100), nullable=True)

    description = Column(Text, nullable=True)

    status = Column(String(50), default="OPEN", nullable=False)

    action_taken = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )