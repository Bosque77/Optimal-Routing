import json
import asyncio
import google_distance_handler


def analyzeRoute(route_items):
    print('inside analyze route')
    urls = []
    for i in range(len(route_items)-1):
        current_route_item = route_items[i]
        next_route_item = route_items[i+1]

        origin_lat = current_route_item['latitude']
        origin_lng = current_route_item['longitude']
        dest_lat = next_route_item['latitude']
        dest_lng = next_route_item['longitude']

        print('about to calculate the distances from the google handler function')
        url = google_distance_handler.formatURL(origin_lat, origin_lng, dest_lat, dest_lng)
        urls.append(url)

    print('sending back the route data')
    route_data = asyncio.run(google_distance_handler.getRouteDistances(urls))

    return route_data




def scrapeGoogleHomePage():
    """
    scrape the home page of google and display the top 10
    most recent headlines
    """
    url = 'https://www.google.com'
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    headlines = soup.find_all('h3')
    for i in range(10):
        print(headlines[i].text)





if __name__=="__main__":
    # file = open('./json_objects/route_items.json')
    # route_items = json.load(file)
    # route_data = analyzeRoute(route_items)
    # print('finished')
    scrapeGoogleHomePage