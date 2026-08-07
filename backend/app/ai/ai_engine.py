def generate_ai_report(threat):

    if threat["severity"] == "CRITICAL":

        return {
            "threat": threat["threat"],
            "severity": threat["severity"],
            "analysis": (
                "Multiple failed login attempts indicate a possible brute-force attack."
            ),
            "recommendation": [
                "Block the source IP",
                "Enable Multi-Factor Authentication",
                "Reset the affected user's password",
                "Review recent login activity"
            ]
        }

    elif threat["severity"] == "HIGH":

        return {
            "threat": threat["threat"],
            "severity": threat["severity"],
            "analysis": "High-risk security event detected.",
            "recommendation": [
                "Investigate immediately",
                "Notify the administrator"
            ]
        }

    else:

        return {
            "threat": threat["threat"],
            "severity": threat["severity"],
            "analysis": "Low-risk event.",
            "recommendation": [
                "Continue monitoring"
            ]
        }