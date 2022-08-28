# Author: Forest Schwartz
# GitHub username:Bosque77
# Date: 08/24/2022
# Description: This module is the entry file for the main bulk of code


# Python program to get a set of
# places according to your search
# query using Google Places API

# importing required modules
import requests, json, random
from dotenv import dotenv_values

# STATUS
DEBUG = True

# url variable store url
base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"



def get_secret():
    pass

def generate_zipcodes():
    zipcodes = []
    file_name = 'zipcodes.txt'
    with open(file_name) as in_file:
        for line in in_file:
            data = in_file.readline()

            if len(data) != 0:
                zipcodes.append(int(data))

    return zipcodes


def generate_random_lat_lng_list(num_of_coordinates):
    """
    creates a list of coordinates equal to the length num_of_coordinates

    Parameters
    ----------
    num_of_coordinates

    Returns
    -------
    lat_lng_list  :  this is a list of tuples that contain a latitude and longitude
    """
    lat_lng_list = []


    if DEBUG != True:
        api_key = get_secret()
    else:
        config = dotenv_values(".env")
        api_key = config["GOOGLE_API_KEY"]
    zipcodes = generate_zipcodes()
    num_of_zipcodes = len(zipcodes)



    while len(lat_lng_list) < num_of_coordinates:

        # getting a random zipcode from the zipcodes list
        rand_num = random.randrange(0,num_of_zipcodes)
        zipcode = zipcodes[rand_num]


        # looking up businesses in that region
        query = f"'businesses in {zipcode} '"
        url = f'{base_url}?query={query}&key={api_key}'
        response = requests.get(url)
        response_as_json = response.json()
        results = response_as_json['results']



        # selecting an arbitrary number of businesses from that region
        num_of_results = len(results)
        num_of_orders_from_this_zipcode = num_of_results // 5

        if num_of_orders_from_this_zipcode > 0:
            for i in range(num_of_orders_from_this_zipcode):
                random_result = random.randrange(0, num_of_results)
                business = results[random_result]

                lat = business['geometry']['location']['lat']
                lng = business['geometry']['location']['lat']

                lat_lng = (lat, lng)
                lat_lng_list.append(lat_lng)
        else:
            random_result = random.randrange(0, num_of_results)
            business = results[random_result]

            lat = business['geometry']['location']['lat']
            lng = business['geometry']['location']['lng']

            lat_lng = (lat, lng)
            lat_lng_list.append(lat_lng)


    # this is temporary so i dont over use my google requests
    with open('lat_lng_list.json', 'w') as outfile:  # just 'w' since it's a text file
        json.dump(lat_lng_list, outfile)

    return lat_lng_list

if __name__ == "__main__":
    lat_lng_list = generate_random_lat_lng_list(10)
    print('pause here')