# Author: Forest Schwartz
# GitHub username:Bosque77
# Date: 08/24/2022
# Description: This module is the entry file for the main bulk of code


# Python program to get a set of
# places according to your search
# query using Google Places API

# importing required modules
import requests, json

# enter your api key here
api_key = 'AIzaSyDBWA8Gu8uc_uOL6Sp2ZIFsRI53PKbAjkw'
# url variable store url
base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
# a generator that provides zipcodes


def generate_zipcodes():
    zipcodes = []
    file_name = 'zipcodes.txt'
    with open(file_name) as in_file:
        for line in in_file:
            data = in_file.readline()

            if len(data) != 0:
                zipcodes.append(int(data))

    zip_generator = (zipcode for zipcode in zipcodes)
    return zip_generator




def generate_places():
    """
    I will get a list of lat, lngs in georgia and then determine addresses
    :return:
    """
    zipcodes = generate_zipcodes()

    zipcode = next(zipcodes)
    print(zipcode)
    query = f"'businesses in {zipcode} '"

    url = f'{base_url}?query={query}&key={api_key}'

    print(url)

    response = requests.get(url)
    response_as_json = response.json()
    results = response_as_json['results']
    lat = results['geometry']['location']['lat']
    lng = results['geometry']['location']['lat']
    print(json.dumps(response_as_json, indent=4, sort_keys=True))


if __name__ == "__main__":
    generate_places()