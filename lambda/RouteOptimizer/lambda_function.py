import json

import analyze_routes
import optimize_routes

GET_RAW_PATH = "/getRoutes"
CREATE_RAW_PATH = "/createRoutes"
ANALYZE_RAW_PATH = "/analyzeRoute"


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
        best_routes = optimize_routes.run(body)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(best_routes)
        }
    elif event['rawPath'] == ANALYZE_RAW_PATH:
        print('inside analyze route')
        route_items = json.loads(event['body'])
        print(route_items)
        route_data = analyze_routes.analyzeRoute(route_items)
        print(route_data)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(route_data)
        }


