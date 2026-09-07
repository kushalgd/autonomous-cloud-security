import json


def parse_cloudtrail_event(message: str):
    """
    Parse a raw CloudTrail JSON message from CloudWatch Logs.
    """

    try:
        event = json.loads(message)

        user_identity = event.get("userIdentity", {})

        return {
            "event_name": event.get("eventName"),
            "event_source": event.get("eventSource"),
            "event_time": event.get("eventTime"),
            "aws_region": event.get("awsRegion"),
            "source_ip": event.get("sourceIPAddress"),
            "read_only": event.get("readOnly"),
            "event_category": event.get("eventCategory"),
            "user_type": user_identity.get("type"),
            "username": (
                user_identity.get("userName")
                or user_identity.get("principalId")
            ),
        }

    except json.JSONDecodeError:
        return None