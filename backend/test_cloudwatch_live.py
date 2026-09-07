from app.cloud.cloudwatch_reader import get_new_security_events


LOG_GROUP = "aws-cloudtrail-logs-150465626339-9e03f167"
LOG_STREAM = "150465626339_CloudTrail_ap-south-1"


print("==============================")
print("AUTOSec AI LIVE CLOUDWATCH")
print("==============================")


token = None


events, token = get_new_security_events(
    LOG_GROUP,
    LOG_STREAM,
    token
)

print("\nFirst read:")
print("Events:", len(events))
print("Token received:", bool(token))


events, new_token = get_new_security_events(
    LOG_GROUP,
    LOG_STREAM,
    token
)

print("\nSecond read:")
print("Events:", len(events))
print("New token received:", bool(new_token))