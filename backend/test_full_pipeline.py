from app.database.session import SessionLocal

from app.threat_detection.sample_logs import sample_logs
from app.threat_detection.analyzer import analyze_logs

from app.ai.ai_engine import generate_ai_report

from app.self_healing.healing_engine import perform_self_healing

from app.services.incident_service import create_incident_from_threat


db = SessionLocal()

try:

    print("\n==============================")
    print("AUTOSEC AI FULL PIPELINE")
    print("==============================")

    # 1. Detect threats
    threats = analyze_logs(sample_logs)

    print("\nThreats Detected:")
    print(threats)

    # 2. Process each threat
    for threat in threats:

        print("\nThreat:")
        print(threat)

        # 3. AI analysis
        ai_report = generate_ai_report(threat)

        print("\nAI Report:")
        print(ai_report)

        # 4. Self-healing
        healing_result = perform_self_healing(ai_report)

        print("\nSelf-Healing:")
        print(healing_result)

        # 5. Create incident automatically
        incident = create_incident_from_threat(
            db,
            threat,
            ai_report,
            healing_result
        )

        print("\nIncident Created:")
        print({
            "id": incident.id,
            "threat": incident.threat,
            "severity": incident.severity,
            "status": incident.status
        })

finally:

    db.close()