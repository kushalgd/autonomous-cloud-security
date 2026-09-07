import re


def parse_security_event(message: str) -> dict:
    """
    Convert a CloudWatch security log message
    into a structured AutoSEC AI security event.
    """

    event_match = re.search(
        r"^(\w+)",
        message
    )

    username_match = re.search(
        r"username=([^\s]+)",
        message
    )

    ip_match = re.search(
        r"source_ip=([^\s]+)",
        message
    )

    attempts_match = re.search(
        r"failed_attempts=(\d+)",
        message
    )

    return {
        "event": event_match.group(1)
        if event_match else "UNKNOWN",

        "username": username_match.group(1)
        if username_match else None,

        "ip": ip_match.group(1)
        if ip_match else None,

        "failed_attempts": int(attempts_match.group(1))
        if attempts_match else 0
    }