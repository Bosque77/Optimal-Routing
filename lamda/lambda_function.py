import json
import optimize_routes

GET_RAW_PATH = "/getRoutes"
CREATE_RAW_PATH = "/createRoutes"


def lambda_handler(event, context):
    print(event)
    if event['rawPath'] == GET_RAW_PATH:
        # GET ROUTE PATH
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Hello from Lambda!')
        }
    elif event['rawPath'] == CREATE_RAW_PATH:
        # CREATE RAW PATH
        print('inside create route')
        body = json.loads(event['body'])
        best_route = optimize_routes.run(body)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Hello from Lambda!')
        }


