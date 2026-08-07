from app.threat_detection.sample_logs import sample_logs
from app.threat_detection.analyzer import analyze_logs

results = analyze_logs(sample_logs)

print("\nDetected Threats\n")

for threat in results:

    print(threat)