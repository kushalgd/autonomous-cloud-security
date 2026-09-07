from app.cloud.cloudwatch_parser import parse_security_event


message = (
    "FAILED_LOGIN "
    "username=admin "
    "source_ip=45.12.100.20 "
    "failed_attempts=3"
)


result = parse_security_event(message)


print("\n==============================")
print("CLOUDWATCH EVENT PARSER")
print("==============================")

print(result)