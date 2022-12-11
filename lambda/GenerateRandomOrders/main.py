# Author: Forest Schwartz
# GitHub username:Bosque77
# Date: 08/24/2022
# Description: This module contains functions to generate a random set of orders for each day


# MODULES
import datetime
import requests
import json
import random
from dotenv import dotenv_values

from my_types import Order


# STATUS
DEBUG = True

# REST END POINTS
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
        rand_num = random.randrange(0, num_of_zipcodes)
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


def generate_random_businesses(num_of_businesses):
    """
    creates a list of businesses and stores them in businesses_list.json

    Parameters
    ----------
    num_of_businesses

    Returns
    -------
    business_list : a list of businesses in the area
    """
    business_list = []

    if DEBUG != True:
        api_key = get_secret()
    else:
        config = dotenv_values(".env")
        api_key = config["GOOGLE_API_KEY"]
    zipcodes = generate_zipcodes()
    num_of_zipcodes = len(zipcodes)

    while len(business_list) < num_of_businesses:

        # getting a random zipcode from the zipcodes list
        rand_num = random.randrange(0, num_of_zipcodes)
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
                lng = business['geometry']['location']['lng']
                name = business['name']
                address = business['formatted_address']
                split_address = address.split(',')
                street = split_address[0]
                city = split_address[1]
                state = 'Georgia'

                business_info = {
                    'name': name,
                    'street': street,
                    'city': city,
                    'state': state,
                    'lat': lat,
                    'lng': lng
                }

                business_list.append(business_info)
                if len(business_list) > num_of_businesses:
                    break

    # dumps the business_list into a json file
    with open('business_list.json', 'w') as outfile:  # just 'w' since it's a text file
        json.dump(business_list, outfile)

    return business_list


def get_random_dumpster_size():
    """
    This function generates a random dumpster size of either 10, 20, 30, or 40
    """
    dumpster_sizes = [10, 20, 30, 40]
    random_dumpster_size = random.choice(dumpster_sizes)
    return random_dumpster_size


def get_todays_date():
    """
    This function gets the current date and returns it in the format of mm/dd/yyyy
    """
    today = datetime.date.today()
    today = today.strftime("%m/%d/%Y")
    return today


def get_pickup_date():
    """
    This function returns a random date at least 3 days from today and at most 10 days from today
    """
    today = datetime.date.today()
    random_number = random.randrange(3, 10)
    pickup_date = today + datetime.timedelta(days=random_number)
    pickup_date = pickup_date.strftime("%m/%d/%Y")
    return pickup_date


def create_test_orders(business_list):
    """
    This function takes in a list of businesses in the area and generates a random order from
    the business info provided

    orders : a random list of orders generated from the provided businesses
    param_1: business_list
    return: orders
    """

    orders = []

    for business in business_list:
        name = business['name']
        email = business['name'] + '@gmail.com'
        phone_number = '555-555-5555'
        street = business['street']
        city = business['city']
        state = business['state']
        zipcode = 30004
        latitude = business['lat']
        longitude = business['lng']
        dumpster_size = get_random_dumpster_size()
        delivery_date = get_todays_date()
        pickup_date = get_pickup_date()
        delivery_time = None
        pickup_time = None
        special_instructions = None
        delivery_completed = False
        pickup_completed = False
        active = True

        order: Order = {
            'name': name,
            'email': email,
            'phone_number': phone_number,
            'street': street,
            'city': city,
            'state': state,
            'zipcode': zipcode,
            'latitude': latitude,
            'longitude': longitude,
            'dumpster_size': dumpster_size,
            'delivery_date': delivery_date,
            'pickup_date': pickup_date,
            'delivery_time': delivery_time,
            'pikcup_time': pickup_time,
            'special_instructions': special_instructions,
            'delivery_completed': delivery_completed,
            'pickup_completed': pickup_completed,
            'active': active,
            'user_id': '61c7483607e4533869b9ec08',
            'region': '61ca3cb19e9ade7351418e30'
        }
        orders.append(order)

    return orders


if __name__ == "__main__":
    # lat_lng_list = generate_random_lat_lng_list(10)
    businesses = generate_random_businesses(10)
    orders = create_test_orders(businesses)
    print('pause here')
