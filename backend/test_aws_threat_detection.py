from app.cloud.cloudwatch_reader import get_security_events
from app.cloud.cloudwatch_parser import parse_security_event
from app.threat_detection.analyzer import analyze_logs


LOG_GROUP = "/autosec-ai/test"
LOG_STREAM = "security-events"


def expand_event(event):
    """
    Convert an AWS security event containing
    failed_attempts into individual login events.
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
    print("AWS → AUTOSEC AI THREAT DETECTION")
    print("======================================")

    # 1. Read AWS CloudWatch
    cloudwatch_events = get_security_events(
        LOG_GROUP,
        LOG_STREAM
    )

    print("\n[1] CLOUDWATCH EVENTS")

    for event in cloudwatch_events:
        print(event)

    # 2. Parse CloudWatch messages
    parsed_events = []

    for event in cloudwatch_events:

        parsed = parse_security_event(
            event["message"]
        )

        parsed_events.append(parsed)

    print("\n[2] PARSED SECURITY EVENTS")

    for event in parsed_events:
        print(event)

    # 3. Normalize events for threat detector
    normalized_events = []

    for event in parsed_events:

        normalized_events.extend(
            expand_event(event)
        )

    print("\n[3] NORMALIZED SECURITY EVENTS")

    for event in normalized_events:
        print(event)

    # 4. Existing threat detection
    threats = analyze_logs(
        normalized_events
    )

    print("\n[4] THREATS DETECTED")

    for threat in threats:
        print(threat)


if __name__ == "__main__":
    main()