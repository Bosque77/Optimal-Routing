import json
import requests
from dotenv import load_dotenv   # Delete this on the production build



from main import *




def lambda_handler(event, context):


    businesses = generate_random_businesses(10)
    orders = create_test_orders(businesses)

    return {
        'statusCode': 200,
        'body': json.dumps(orders)
    }


if __name__ == "__main__":
    event = {
        "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
        "detail-type": "Scheduled Event",
        "source": "aws.events",
        "account": "123456789012",
        "time": "1970-01-01T00:00:00Z",
        "region": "{region}",
        "resources": [
            "arn:{partition}:events:{region}:123456789012:rule/my-schedule"
        ],
        "detail": {}
    }

    lambda_handler(event, None)
