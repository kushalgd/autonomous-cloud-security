import os
import boto3


AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")


def get_logs_client():
    return boto3.client(
        "logs",
        region_name=AWS_REGION
    )


def get_cloudwatch_client():
    return boto3.client(
        "cloudwatch",
        region_name=AWS_REGION
    )