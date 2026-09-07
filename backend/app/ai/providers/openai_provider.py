import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError(
        "OPENAI_API_KEY is not configured in the .env file."
    )

client = OpenAI(api_key=api_key)


def analyze_threat(threat: dict) -> str:

    prompt = f"""
You are a cybersecurity threat analysis assistant.

Analyze the following security event:

Threat: {threat.get("threat")}
IP Address: {threat.get("ip")}
Failed Attempts: {threat.get("failed_attempts")}
Severity: {threat.get("severity")}

Provide:

1. Threat explanation
2. Risk assessment
3. Recommended remediation actions
4. Why the recommended actions are appropriate

Do not execute any action.
Only provide analysis and recommendations.
"""

    response = client.responses.create(
        model="gpt-5-mini",
        input=prompt
    )

    return response.output_text