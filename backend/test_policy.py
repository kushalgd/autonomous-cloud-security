from app.security.policy import validate_actions


recommended_actions = [
    "BLOCK_IP",
    "ENABLE_MFA",
    "DELETE_DATABASE",
    "FORMAT_SERVER"
]

approved_actions = validate_actions(
    recommended_actions
)

print("Recommended Actions:")
print(recommended_actions)

print("\nApproved Actions:")
print(approved_actions)