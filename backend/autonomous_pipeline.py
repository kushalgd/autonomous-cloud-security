from app.database.session import SessionLocal

from app.threat_detection.sample_logs import sample_logs
from app.threat_detection.analyzer import analyze_logs

from app.ai.providers.ollama_provider import analyze_threat

from app.security.policy import validate_actions

from app.self_healing.aws_executor import execute_action

from app.services.incident_service import create_incident_from_threat


def run_pipeline():

    db = SessionLocal()

    try:

        print("\n======================================")
        print("       AUTOSEC AI AUTONOMOUS PIPELINE")
        print("======================================")

        # 1. Detect threats
        threats = analyze_logs(sample_logs)

        print("\n[1] THREATS DETECTED")
        print(threats)

        for threat in threats:

            # 2. AI analysis
            ai_report = analyze_threat(threat)

            print("\n[2] AI ANALYSIS")
            print(ai_report)

            # 3. Safety policy
            approved_actions = validate_actions(
                ai_report.get("recommended_actions", [])
            )

            print("\n[3] APPROVED ACTIONS")
            print(approved_actions)

            # 4. Execute approved actions
            action_results = []

            for action in approved_actions:

                result = execute_action(
                    action,
                    threat.get("ip")
                )

                action_results.append(result)

            print("\n[4] SELF-HEALING ACTION RESULTS")

            for result in action_results:
                print(result)

            # 5. Prepare incident action log
            action_names = [
                result["action"]
                for result in action_results
                if result.get("status") in [
                    "DRY_RUN",
                    "SUCCESS"
                ]
            ]

            healing_result = {
                "actions": action_names
            }

            # 6. Create incident
            incident = create_incident_from_threat(
                db,
                threat,
                ai_report,
                healing_result
            )

            print("\n[5] INCIDENT CREATED")

            print({
                "id": incident.id,
                "threat": incident.threat,
                "severity": incident.severity,
                "status": incident.status,
                "action_taken": incident.action_taken
            })

        print("\n======================================")
        print("PIPELINE COMPLETED SUCCESSFULLY")
        print("======================================")

    finally:

        db.close()


if __name__ == "__main__":
    run_pipeline()