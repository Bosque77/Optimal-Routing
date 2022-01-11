import json

print('Loading Function')

def lambda_handler(event, context):
    #1. Parse out query string params
    print(event)
    route_info = event['queryStringParameters']['routeInfo']

    print(route_info)

    #2. Construct the body of the response object

    route_response = {}
    route_response['info'] = route_info
    route_response['test'] = 'this is a test'

    #3. Construct http response object
    response_object = {}
    response_object['statusCode'] = 200
    response_object['headers'] = {}
    response_object['Content-Type'] = 'applicaton/json'
    response_object['body'] = json.dumps(route_response)

    #4. Return the response object
    return response_object