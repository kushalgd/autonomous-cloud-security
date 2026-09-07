from app.cloud.cloudwatch_reader import get_security_events


events = get_security_events(
    "/autosec-ai/test",
    "security-events"
)

print("\n==============================")
print("AUTOSec AI CLOUDWATCH EVENTS")
print("==============================")

for event in events:
    print(event)