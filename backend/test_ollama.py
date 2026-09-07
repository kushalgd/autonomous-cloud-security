from app.threat_detection.sample_logs import sample_logs
from app.threat_detection.analyzer import analyze_logs
from app.ai.providers.ollama_provider import analyze_threat


threats = analyze_logs(sample_logs)

for threat in threats:

    print("\n==============================")
    print("OLLAMA AI THREAT ANALYSIS")
    print("==============================")

    result = analyze_threat(threat)

    print(result)