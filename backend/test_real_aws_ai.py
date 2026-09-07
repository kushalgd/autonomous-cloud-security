from app.cloud.cloudwatch_reader import get_security_events
from app.cloud.cloudtrail_parser import parse_cloudtrail_event
from app.cloud.cloudtrail_threat_detector import detect_cloudtrail_threat
from app.ai.providers.ollama_provider import analyze_threat


LOG_GROUP = "aws-cloudtrail-logs-150465626339-9e03f167"
LOG_STREAM = "150465626339_CloudTrail_ap-south-1"


def main():

    print("==============================")
    print("REAL AWS → AI THREAT ANALYSIS")
    print("==============================")

    # 1. Read CloudTrail events
    events = get_security_events(
        LOG_GROUP,
        LOG_STREAM
    )

    print("\n[1] AWS EVENTS")
    print(f"Events received: {len(events)}")

    # 2. Parse + detect threats
    for event in events:

        parsed = parse_cloudtrail_event(
            event["message"]
        )

        if not parsed:
            continue

        threat = detect_cloudtrail_threat(
            parsed
        )

        if not threat:
            continue

        print("\n[2] THREAT DETECTED")
        print(threat)

        # 3. AI analysis
        ai_result = analyze_threat(
            threat
        )

        print("\n[3] AI ANALYSIS")
        print(ai_result)


if __name__ == "__main__":
    main()