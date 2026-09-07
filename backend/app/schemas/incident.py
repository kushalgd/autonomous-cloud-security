from pydantic import BaseModel
from datetime import datetime


class IncidentCreate(BaseModel):
    threat: str
    severity: str
    source_ip: str | None = None
    description: str | None = None
    status: str = "OPEN"
    action_taken: str | None = None


class IncidentResponse(BaseModel):
    id: int
    threat: str
    severity: str
    source_ip: str | None
    description: str | None
    status: str
    action_taken: str | None
    created_at: datetime

    class Config:
        from_attributes = True