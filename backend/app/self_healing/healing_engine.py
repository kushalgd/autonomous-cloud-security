def perform_self_healing(report):

    actions = []

    severity = report["severity"]

    if severity == "CRITICAL":

        actions.append("Blocked Suspicious IP")
        actions.append("Disabled User Account")
        actions.append("Sent Security Alert")
        actions.append("Created Incident Report")

    elif severity == "HIGH":

        actions.append("Sent Security Alert")
        actions.append("Created Incident Report")

    else:

        actions.append("Monitoring Threat")

    return {
        "threat": report["threat"],
        "severity": severity,
        "actions": actions
    }