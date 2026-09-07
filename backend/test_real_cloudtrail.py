from app.cloud.cloudwatch_reader import get_security_events
from app.cloud.cloudtrail_parser import parse_cloudtrail_event


LOG_GROUP = "aws-cloudtrail-logs-150465626339-9e03f167"
LOG_STREAM = "150465626339_CloudTrail_ap-south-1"


def main():

    print("==============================")
    print("REAL AWS CLOUDTRAIL PIPELINE")
    print("==============================")

    events = get_security_events(
        LOG_GROUP,
        LOG_STREAM
    )

    print("\n[1] RAW CLOUDTRAIL EVENTS")

    for event in events[:5]:
        print(event)

    print("\n[2] PARSED CLOUDTRAIL EVENTS")

    for event in events[:5]:

        parsed = parse_cloudtrail_event(
            event["message"]
        )

        if parsed:
            print(parsed)


if __name__ == "__main__":
    main()