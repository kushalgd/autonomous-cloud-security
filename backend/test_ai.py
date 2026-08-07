from app.threat_detection.sample_logs import sample_logs
from app.threat_detection.analyzer import analyze_logs
from app.ai.ai_engine import generate_ai_report

threats = analyze_logs(sample_logs)

for threat in threats:

    report = generate_ai_report(threat)

    print("\nAI Threat Report\n")
    print(report)