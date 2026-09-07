import boto3


REGION = "ap-south-1"


def get_latest_token(
    log_group_name,
    log_stream_name
):
    """
    Get the current end position of the CloudWatch stream.
    This lets the live monitor start from NOW instead
    of processing the historical backlog.
    """

    client = boto3.client(
        "logs",
        region_name=REGION
    )

    response = client.get_log_events(
        logGroupName=log_group_name,
        logStreamName=log_stream_name,
        startFromHead=False,
        limit=1
    )

    return response.get("nextForwardToken")


def get_new_security_events(
    log_group_name,
    log_stream_name,
    next_token=None,
    limit=20
):
    client = boto3.client(
        "logs",
        region_name=REGION
    )

    kwargs = {
        "logGroupName": log_group_name,
        "logStreamName": log_stream_name,
        "startFromHead": True,
        "limit": limit
    }

    if next_token:
        kwargs["nextToken"] = next_token

    response = client.get_log_events(**kwargs)

    return (
        response.get("events", []),
        response.get("nextForwardToken")
    )