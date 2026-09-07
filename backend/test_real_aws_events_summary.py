from app.cloud.cloudwatch_reader import get_security_events
from app.cloud.cloudtrail_parser import parse_cloudtrail_event


LOG_GROUP = "aws-cloudtrail-logs-150465626339-9e03f167"
LOG_STREAM = "150465626339_CloudTrail_ap-south-1"


events = get_security_events(
    LOG_GROUP,
    LOG_STREAM
)

print("==============================")
print("AWS CLOUDTRAIL EVENT SUMMARY")
print("==============================")

for event in events:

    parsed = parse_cloudtrail_event(
        event["message"]
    )

    if not parsed:
        continue

    print({
        "event_name": parsed["event_name"],
        "event_source": parsed["event_source"],
        "event_time": parsed["event_time"],
        "aws_region": parsed["aws_region"],
        "read_only": parsed["read_only"],
        "user_type": parsed["user_type"]
    })
    