import json
import requests


OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
MODEL_NAME = "llama3.2"


def analyze_threat(threat: dict) -> dict:

    prompt = f"""
You are a cybersecurity threat analysis engine.

Analyze this security event:

Threat: {threat.get("threat")}
Source IP: {threat.get("ip")}
Failed Attempts: {threat.get("failed_attempts")}
Severity: {threat.get("severity")}

Return ONLY valid JSON.

Use exactly this structure:

{{
    "threat": "string",
    "severity": "LOW | MEDIUM | HIGH | CRITICAL",
    "analysis": "short explanation",
    "recommended_actions": [
        "BLOCK_IP",
        "ENABLE_MFA",
        "MONITOR_ACTIVITY"
    ]
}}

Rules:
- Do not execute any action.
- Only recommend actions.
- Do not include Markdown.
- Do not include ```json.
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False,
            "format": "json"
        },
        timeout=120
    )

    response.raise_for_status()

    data = response.json()

    return json.loads(data["response"])