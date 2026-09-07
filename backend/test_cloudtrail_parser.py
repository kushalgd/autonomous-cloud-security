from app.cloud.cloudtrail_parser import parse_cloudtrail_event


message = """
{
    "eventVersion": "1.11",
    "userIdentity": {
        "type": "Root",
        "principalId": "ROOT"
    },
    "eventTime": "2026-08-13T15:35:40Z",
    "eventSource": "notifications.amazonaws.com",
    "eventName": "ListManagedNotificationEvents",
    "awsRegion": "us-east-1",
    "sourceIPAddress": "REDACTED",
    "readOnly": true,
    "eventType": "AwsApiCall",
    "managementEvent": true,
    "eventCategory": "Management"
}
"""


result = parse_cloudtrail_event(message)

print("==============================")
print("CLOUDTRAIL PARSER")
print("==============================")
print(result)