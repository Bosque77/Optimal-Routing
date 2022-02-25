import json
import lambda_function



def testCreateRoutes():
    # Testing CreateRoutes Lambda Function
    test_file_location = '../json_objects/createRoutes_Event.json'
    f = open(test_file_location)
    event = json.load(f)
    context = '<__main__.LambdaContext object at 0x7f9e431f7ca0>'
    lambda_function.lambda_handler(event,context)


def testAnalyzeRoute():
    # Testing AnalyzeRoute Lambda Function
    test_file_location = '../json_objects/analyzeRoute_Event.json'
    f = open(test_file_location)
    event = json.load(f)
    context = '<__main__.LambdaContext object at 0x7f9e431f7ca0>'
    lambda_function.lambda_handler(event,context)

if __name__=="__main__":
    testAnalyzeRoute()