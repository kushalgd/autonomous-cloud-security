from app.threat_detection.detector import detect_threat
from app.threat_detection.sample_logs import sample_logs

print("Threat Detection Results\n")

for log in sample_logs:

    result = detect_threat(log)

    print(result)