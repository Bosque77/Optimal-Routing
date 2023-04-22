import json
import analyze_routes
import optimize_routes

def get_routes(event, context):
    return create_response('Hello from Lambda!')

def create_routes(event, context):
    body = json.loads(event['body'])
    best_routes = optimize_routes.run(body)
    return create_response(json.dumps(best_routes))

def analyze_route(event, context):
    route_items = json.loads(event['body'])
    route_data = analyze_routes.analyzeRoute(route_items)
    return create_response(json.dumps(route_data))

def create_response(body):
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': body
    }
