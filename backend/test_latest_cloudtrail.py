from app.cloud.cloudwatch_reader import get_latest_security_events


LOG_GROUP = "aws-cloudtrail-logs-150465626339-9e03f167"

LOG_STREAM = "150465626339_CloudTrail_ap-south-1"


events = get_latest_security_events(
    LOG_GROUP,
    LOG_STREAM,
    limit=10
)


print("==============================")
print("LATEST CLOUDTRAIL EVENTS")
print("==============================")

for event in events:

    print({
        "timestamp": event.get("timestamp"),
        "message_length": len(event.get("message", ""))
    })