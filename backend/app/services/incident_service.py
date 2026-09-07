from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate


def create_incident(
    db: Session,
    incident_data: IncidentCreate
):
    incident = Incident(
        threat=incident_data.threat,
        severity=incident_data.severity,
        source_ip=incident_data.source_ip,
        description=incident_data.description,
        status=incident_data.status,
        action_taken=incident_data.action_taken
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return incident


def get_all_incidents(db: Session):
    return (
        db.query(Incident)
        .order_by(Incident.created_at.desc())
        .all()
    )


def get_incident_by_id(
    db: Session,
    incident_id: int
):
    return (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )


def update_incident_status(
    db: Session,
    incident_id: int,
    status: str
):
    incident = get_incident_by_id(db, incident_id)

    if incident is None:
        return None

    incident.status = status

    db.commit()
    db.refresh(incident)

    return incident

def create_incident_from_threat(
    db: Session,
    threat: dict,
    ai_report: dict,
    healing_result: dict
):
    action_taken = ", ".join(
        healing_result.get("actions", [])
    )

    incident_data = IncidentCreate(
        threat=threat["threat"],
        severity=threat["severity"],
        source_ip=threat.get("ip"),
        description=ai_report.get("analysis"),
        status="OPEN",
        action_taken=action_taken
    )

    return create_incident(
        db,
        incident_data
    )