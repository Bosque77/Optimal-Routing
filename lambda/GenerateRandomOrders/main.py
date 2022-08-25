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
url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"


def example():
    # The text string on which to search
    query = input('Search query: ')

    # get method of requests module
    # return response object
    r = requests.get(url + 'query=' + query +
                     '&key=' + api_key)

    # json method of response object convert
    #  json format data into python format data
    x = r.json()

    # now x contains list of nested dictionaries
    # we know dictionary contain key value pair
    # store the value of result key in variable y
    y = x['results']

    # keep looping upto length of y
    for i in range(len(y)):
        # Print value corresponding to the
        # 'name' key at the ith index of y
        print(y[i]['name'])




def generate_places():
    """
    I will get a list of lat, lngs in georgia and then determine addresses
    :return:
    """

    list_of_restaurants = []
    city = 'atlanta'
    query = f'{"mexican restaurants in " + city}'
    r = requests.get(url + 'query=' + query +
                     '&key=' + api_key)



    # json method of response object convert
    #  json format data into python format data
    x = r.json()

    # now x contains list of nested dictionaries
    # we know dictionary contain key value pair
    # store the value of result key in variable y
    y = x['results']

    # keep looping upto length of y
    for i in range(len(y)):
        # Print value corresponding to the
        # 'name' key at the ith index of y
        print(y[i]['name'])


if __name__ == "__main__":
    generate_places()