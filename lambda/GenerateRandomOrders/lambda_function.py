import json, requests

def lambda_handler(event, context):

    print(event)
    print(context)

    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
