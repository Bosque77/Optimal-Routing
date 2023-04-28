import json
import lambda_function


def testCreateRoutes():
  

    # Testing CreateRoutes Lambda Function
    with open('createRoutes_Data.json', 'r') as file:
        json_data = json.load(file)

    event = {
    "body": json.dumps(json_data)
    }
    dummy_context = None
    response = lambda_function.create_routes(event, dummy_context)
    print(response)


def testAnalyzeRoute():
    # Testing AnalyzeRoute Lambda Function
    test_file_location = './json_objects/analyzeRoute_Event.json'
    f = open(test_file_location)
    event = json.load(f)
    response = lambda_function.analyze_route(event)
    print(response)

if __name__=="__main__":
    testCreateRoutes()