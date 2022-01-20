import json
import optimize_routes

GET_RAW_PATH = "/getRoutes"
CREATE_RAW_PATH = "/createRoutes"


def lambda_handler(event, context):
    print(event)
    if event['rawPath'] == GET_RAW_PATH:
        # GET ROUTE PATH
        return {'fisrt_name': "Daniel", "last_name": "Carusi"}



    elif event['rawPath'] == CREATE_RAW_PATH:
        # CREATE RAW PATH
        print('inside create route')
        body = json.loads(event['body'])
        optimize_routes.run(body)
        return {'info': "Inside the post Request"}


