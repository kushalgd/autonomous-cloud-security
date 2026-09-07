from app.self_healing.aws_executor import execute_action


result = execute_action(
    "BLOCK_IP",
    "45.12.100.20"
)

print("AWS ACTION RESULT")
print(result)