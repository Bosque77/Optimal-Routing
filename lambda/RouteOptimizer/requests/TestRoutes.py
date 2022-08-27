import requests
import json

test_file_location = '../json_objects/example_route_query.json'
url = 'https://ldryzqul7l.execute-api.us-west-1.amazonaws.com/createRoutes'


f = open(test_file_location)
route_query = json.load(f)

x = requests.post(url, json = route_query)

print(x.json())