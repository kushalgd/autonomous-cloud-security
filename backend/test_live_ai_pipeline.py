from app.ai.providers.ollama_provider import analyze_threat
from app.security.policy import validate_actions
from app.self_healing.aws_executor import execute_action


def main():

    print("==============================")
    print("LIVE AI THREAT PIPELINE TEST")
    print("==============================")

    # Safe simulated threat.
    # We are NOT performing an actual attack.
    threat = {
        "threat": "Brute Force Attack",
        "event_name": "ConsoleLogin",
        "severity": "CRITICAL",
        "source_ip": "45.12.100.20",
        "aws_region": "ap-south-1",
        "username": "test-user"
    }

    print("\n[1] SIMULATED THREAT")
    print(threat)

    # AI
    print("\n[2] AI ANALYSIS")

    ai_result = analyze_threat(threat)

    print(ai_result)

    # Policy
    print("\n[3] POLICY VALIDATION")

    recommended_actions = ai_result.get(
        "recommended_actions",
        []
    )

    approved_actions = validate_actions(
        recommended_actions
    )

    print("Recommended:", recommended_actions)
    print("Approved:", approved_actions)

    # Self-healing
    print("\n[4] SELF-HEALING DRY RUN")

    for action in approved_actions:

        result = execute_action(
            action,
            threat.get("source_ip")
        )

        print(result)

    print("\n======================================")
    print("AI THREAT PIPELINE TEST COMPLETED")
    print("======================================")


if __name__ == "__main__":
    main()