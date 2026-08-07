from collections import Counter


def analyze_logs(logs):

    failed_login_counter = Counter()

    threats = []

    for log in logs:

        if log["event"] == "FAILED_LOGIN":

            failed_login_counter[log["ip"]] += 1

    for ip, count in failed_login_counter.items():

        if count >= 3:

            threats.append({

                "threat": "Brute Force Attack",

                "ip": ip,

                "failed_attempts": count,

                "severity": "CRITICAL"

            })

    return threats