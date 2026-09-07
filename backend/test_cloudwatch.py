from app.cloud.aws_config import get_logs_client


def list_log_groups():

    client = get_logs_client()

    response = client.describe_log_groups(
        limit=10
    )

    log_groups = response.get(
        "logGroups",
        []
    )

    print("\n==============================")
    print("AWS CLOUDWATCH LOG GROUPS")
    print("==============================")

    if not log_groups:
        print("No CloudWatch log groups found.")

    for group in log_groups:
        print(
            group.get("logGroupName")
        )


if __name__ == "__main__":
    list_log_groups()