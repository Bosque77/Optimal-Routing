import asyncio
import aiohttp


async def get_distance(session,url):
    async with session.get(url, ssl=False) as resp:
        distance= await resp.json()
        return distance

async def getRouteDistances(urls):
    conn = aiohttp.TCPConnector(ssl=False, enable_cleanup_closed=True)
    async with aiohttp.ClientSession(connector=conn) as session:

        tasks=[]
        for url in urls:
            tasks.append(asyncio.ensure_future(get_distance(session,url)))


        api_response_distances = await asyncio.gather(*tasks)
  
        distances_and_durations = []
        for response_object in api_response_distances:
            distance = response_object['rows'][0]['elements'][0]['distance']['value']
            duration = response_object['rows'][0]['elements'][0]['duration']['value']

            dist_dur = {'distance':distance,'duration':duration}
            distances_and_durations.append(dist_dur)

        return distances_and_durations


def formatURL(origin_lat, origin_lng, dest_lat, dest_lng):

    base_url = f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin_lat}%2C{origin_lng}&destinations={dest_lat}%2C{dest_lng}&key=AIzaSyDBWA8Gu8uc_uOL6Sp2ZIFsRI53PKbAjkw'
    url = base_url.format(origin_lat = origin_lat, origin_lng = origin_lng, dest_lat = dest_lat, dest_lng = dest_lng)
    return url

if __name__ =="__main__":

    url_1 = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=34.25%2C-84.111&destinations=34.131%2C-84.523&key=AIzaSyDBWA8Gu8uc_uOL6Sp2ZIFsRI53PKbAjkw'
    url_2 = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=34.131%2C-84.523&destinations=33.247%2C-84.294&key=AIzaSyDBWA8Gu8uc_uOL6Sp2ZIFsRI53PKbAjkw'
    urls = [url_1, url_2]
    asyncio.run(getRouteDistances(urls))
    print('finished')
