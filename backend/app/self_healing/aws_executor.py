import os


DRY_RUN = os.getenv(
    "AWS_SELF_HEALING_DRY_RUN",
    "true"
).lower() == "true"


def block_ip(ip_address: str) -> dict:

    if not ip_address:
        return {
            "action": "BLOCK_IP",
            "status": "FAILED",
            "message": "IP address is required"
        }

    if DRY_RUN:
        return {
            "action": "BLOCK_IP",
            "ip": ip_address,
            "status": "DRY_RUN",
            "message": f"Would block IP address {ip_address}"
        }

    return {
        "action": "BLOCK_IP",
        "ip": ip_address,
        "status": "NOT_IMPLEMENTED",
        "message": "Real AWS IP blocking is not implemented yet"
    }


def enable_mfa() -> dict:

    return {
        "action": "ENABLE_MFA",
        "status": "NOT_IMPLEMENTED",
        "message": "MFA enforcement is not implemented yet"
    }


def execute_action(
    action: str,
    ip_address: str | None = None
) -> dict:

    if action == "BLOCK_IP":
        return block_ip(ip_address)

    if action == "ENABLE_MFA":
        return enable_mfa()

    return {
        "action": action,
        "status": "REJECTED",
        "message": "Action is not supported by the executor"
    }