import boto3


REGION = "ap-south-1"


def test_aws_connection():

    sts = boto3.client(
        "sts",
        region_name=REGION
    )

    identity = sts.get_caller_identity()

    print("\n==============================")
    print("AWS CONNECTION TEST")
    print("==============================")

    print("AWS Account:", identity["Account"])
    print("AWS ARN:", identity["Arn"])

    print("\nAWS connection successful!")


if __name__ == "__main__":
    test_aws_connection()