from app.threat_detection.sample_logs import sample_logs
from app.threat_detection.analyzer import analyze_logs
from app.ai.ai_engine import generate_ai_report
from app.self_healing.healing_engine import perform_self_healing

threats = analyze_logs(sample_logs)

for threat in threats:

    report = generate_ai_report(threat)

    result = perform_self_healing(report)

    print("\n==============================")
    print("SELF HEALING RESULT")
    print("==============================")

    print(result)