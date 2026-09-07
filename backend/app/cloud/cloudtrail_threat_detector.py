THREAT_RULES = {
    "ConsoleLogin": {
        "severity": "MEDIUM",
        "threat": "Suspicious Console Activity"
    },
    "CreateAccessKey": {
        "severity": "HIGH",
        "threat": "New Access Key Created"
    },
    "CreateUser": {
        "severity": "HIGH",
        "threat": "New IAM User Created"
    },
    "AttachUserPolicy": {
        "severity": "HIGH",
        "threat": "IAM Policy Attached"
    },
    "PutUserPolicy": {
        "severity": "HIGH",
        "threat": "IAM Policy Modified"
    },
    "DeleteTrail": {
        "severity": "CRITICAL",
        "threat": "CloudTrail Protection Disabled"
    },
    "StopLogging": {
        "severity": "CRITICAL",
        "threat": "CloudTrail Logging Disabled"
    }
}


def detect_cloudtrail_threat(event):
    event_name = event.get("event_name")

    rule = THREAT_RULES.get(event_name)

    if not rule:
        return None

    return {
        "threat": rule["threat"],
        "event_name": event_name,
        "severity": rule["severity"],
        "source_ip": event.get("source_ip"),
        "username": event.get("username"),
        "aws_region": event.get("aws_region"),
    }