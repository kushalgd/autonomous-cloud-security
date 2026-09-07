from app.cloud.cloudwatch_reader import get_security_events
from app.cloud.cloudwatch_parser import parse_security_event
from app.threat_detection.analyzer import analyze_logs

from app.ai.providers.ollama_provider import analyze_threat

from app.security.policy import validate_actions

from app.self_healing.aws_executor import execute_action

from app.database.session import SessionLocal
from app.services.incident_service import create_incident_from_threat


LOG_GROUP = "/autosec-ai/test"
LOG_STREAM = "security-events"


def expand_event(event):
    """
    Convert failed_attempts into individual events
    for the existing threat detector.
    """

    if event["event"] == "FAILED_LOGIN":

        count = event.get("failed_attempts", 1)

        return [
            {
                "event": "FAILED_LOGIN",
                "username": event.get("username"),
                "ip": event.get("ip")
            }
            for _ in range(count)
        ]

    return [event]


def main():

    print("\n======================================")
    print("   AWS → AI → SELF-HEALING PIPELINE")
    print("======================================")

    db = SessionLocal()

    try:

        # ------------------------------------------------
        # 1. READ AWS CLOUDWATCH
        # ------------------------------------------------

        cloudwatch_events = get_security_events(
            LOG_GROUP,
            LOG_STREAM
        )

        print("\n[1] AWS CLOUDWATCH EVENTS")

        for event in cloudwatch_events:
            print(event)

        # ------------------------------------------------
        # 2. PARSE EVENTS
        # ------------------------------------------------

        parsed_events = []

        for event in cloudwatch_events:

            parsed = parse_security_event(
                event["message"]
            )

            parsed_events.append(parsed)

        print("\n[2] PARSED EVENTS")

        for event in parsed_events:
            print(event)

        # ------------------------------------------------
        # 3. NORMALIZE EVENTS
        # ------------------------------------------------

        normalized_events = []

        for event in parsed_events:

            normalized_events.extend(
                expand_event(event)
            )

        print("\n[3] NORMALIZED EVENTS")

        for event in normalized_events:
            print(event)

        # ------------------------------------------------
        # 4. THREAT DETECTION
        # ------------------------------------------------

        threats = analyze_logs(
            normalized_events
        )

        print("\n[4] THREATS DETECTED")

        for threat in threats:
            print(threat)

        # ------------------------------------------------
        # 5. AI ANALYSIS
        # ------------------------------------------------

        for threat in threats:

            ai_report = analyze_threat(
                threat
            )

            print("\n[5] AI ANALYSIS")

            print(ai_report)

            # --------------------------------------------
            # 6. SAFETY POLICY
            # --------------------------------------------

            approved_actions = validate_actions(
                ai_report.get(
                    "recommended_actions",
                    []
                )
            )

            print("\n[6] APPROVED ACTIONS")

            print(approved_actions)

            # --------------------------------------------
            # 7. SELF-HEALING
            # --------------------------------------------

            action_results = []

            for action in approved_actions:

                result = execute_action(
                    action,
                    threat.get("ip")
                )

                action_results.append(result)

            print("\n[7] SELF-HEALING RESULTS")

            for result in action_results:
                print(result)

            # --------------------------------------------
            # 8. RECORD EXECUTED ACTIONS
            # --------------------------------------------

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

            # --------------------------------------------
            # 9. CREATE INCIDENT
            # --------------------------------------------

            incident = create_incident_from_threat(
                db,
                threat,
                ai_report,
                healing_result
            )

            print("\n[8] INCIDENT CREATED")

            print({
                "id": incident.id,
                "threat": incident.threat,
                "severity": incident.severity,
                "status": incident.status,
                "action_taken": incident.action_taken
            })

        print("\n======================================")
        print("AWS FULL PIPELINE COMPLETED")
        print("======================================")

    finally:

        db.close()


if __name__ == "__main__":
    main()