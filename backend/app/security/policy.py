ALLOWED_ACTIONS = {
    "BLOCK_IP",
    "ENABLE_MFA",
    "MONITOR_ACTIVITY",
}


def validate_actions(recommended_actions: list[str]) -> list[str]:
    """
    Accept only actions explicitly allowed
    by the AutoSEC AI security policy.
    """

    approved_actions = []

    for action in recommended_actions:
        if action in ALLOWED_ACTIONS:
            approved_actions.append(action)

    return approved_actions