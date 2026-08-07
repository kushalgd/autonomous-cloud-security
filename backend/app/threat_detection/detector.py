from app.threat_detection.rules import THREAT_RULES


def detect_threat(log):

    event = log["event"]

    if event not in THREAT_RULES:
        return {
            "severity": "UNKNOWN",
            "description": "Unknown Event"
        }

    rule = THREAT_RULES[event]

    return {
        "event": event,
        "severity": rule["severity"],
        "description": rule["description"],
        "username": log["username"],
        "ip": log["ip"]
    }