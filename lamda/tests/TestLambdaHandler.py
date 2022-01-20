import json
import lamda_handler

test_file_location = '../json_objects/event.json'
f = open(test_file_location)

event = json.load(f)
context = '<__main__.LambdaContext object at 0x7f9e431f7ca0>'
lamda_handler.lambda_handler(event,context)