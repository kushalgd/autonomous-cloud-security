from app.cloud.cloudtrail_threat_detector import detect_cloudtrail_threat


events = [
    {
        "event_name": "ListManagedNotificationEvents",
        "event_source": "notifications.amazonaws.com",
        "source_ip": "REDACTED",
        "aws_region": "us-east-1",
        "username": "ROOT"
    },
    {
        "event_name": "CreateAccessKey",
        "event_source": "iam.amazonaws.com",
        "source_ip": "REDACTED",
        "aws_region": "ap-south-1",
        "username": "test-user"
    },
    {
        "event_name": "DeleteTrail",
        "event_source": "cloudtrail.amazonaws.com",
        "source_ip": "REDACTED",
        "aws_region": "ap-south-1",
        "username": "test-user"
    }
]


print("==============================")
print("CLOUDTRAIL THREAT DETECTION")
print("==============================")

for event in events:

    threat = detect_cloudtrail_threat(event)

    if threat:
        print("THREAT DETECTED")
        print(threat)
    else:
        print("NORMAL EVENT")
        print(event["event_name"])