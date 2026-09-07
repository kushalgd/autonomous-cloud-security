import time
import hashlib

from app.cloud.cloudwatch_reader import get_new_security_events
from app.cloud.cloudtrail_parser import parse_cloudtrail_event
from app.cloud.cloudtrail_threat_detector import detect_cloudtrail_threat

from app.ai.providers.ollama_provider import analyze_threat
from app.security.policy import validate_actions
from app.self_healing.aws_executor import execute_action


LOG_GROUP = "aws-cloudtrail-logs-150465626339-9e03f167"
LOG_STREAM = "150465626339_CloudTrail_ap-south-1"

POLL_INTERVAL = 10

processed_events = set()


def event_fingerprint(event):
    """
    Create a unique fingerprint for a CloudWatch event.
    """

    raw = (
        str(event.get("timestamp", "")) +
        event.get("message", "")
    )

    return hashlib.sha256(
        raw.encode("utf-8")
    ).hexdigest()


def monitor():

    print("==============================")
    print("AUTOSEC AI LIVE SECURITY MONITOR")
    print("==============================")

    next_token = None

    while True:

        events, new_token = get_new_security_events(
            LOG_GROUP,
            LOG_STREAM,
            next_token,
            limit=20
        )

        new_events = []

        for event in events:

            fingerprint = event_fingerprint(event)

            if fingerprint in processed_events:
                continue

            processed_events.add(fingerprint)
            new_events.append(event)

        print(
            f"\nReceived {len(events)} events | "
            f"New unique events: {len(new_events)}"
        )

        for event in new_events:

            parsed = parse_cloudtrail_event(
                event["message"]
            )

            if not parsed:
                continue

            threat = detect_cloudtrail_threat(parsed)

            if not threat:
                print(
                    f"Normal event: "
                    f"{parsed.get('event_name')}"
                )
                continue

            print("\n======================================")
            print("🚨 THREAT DETECTED")
            print("======================================")

            print({
                "threat": threat["threat"],
                "event_name": threat["event_name"],
                "severity": threat["severity"],
                "source_ip": threat["source_ip"],
                "aws_region": threat["aws_region"]
            })

            print("\n[AI ANALYSIS]")

            ai_result = analyze_threat(threat)

            print(ai_result)

            recommended_actions = ai_result.get(
                "recommended_actions",
                []
            )

            approved_actions = validate_actions(
                recommended_actions
            )

            print("\n[APPROVED ACTIONS]")
            print(approved_actions)

            print("\n[SELF-HEALING]")

            for action in approved_actions:

                result = execute_action(
                    action,
                    threat.get("source_ip")
                )

                print(result)

        next_token = new_token

        print("Waiting for new AWS events...")

        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    try:
        monitor()
    except KeyboardInterrupt:
        print("\n")
        print("======================================")
        print("AUTOSEC AI MONITOR STOPPED")
        print("======================================")