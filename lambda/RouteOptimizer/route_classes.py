from typing import List
from config import DISTANCE_MATRIX_URL, GOOGLE_API_KEY
import asyncio
import google_distance_handler

class RouteObject:
    def __init__(self):
        print('created route object')


class Route:
    def __init__(self, route_objects:List[RouteObject]):
        self.route_objects = route_objects
        self.distances = []
        self.durations = []
        self.total_distance = 0
        self.total_duration = 0

        urls = []
        for i in range(len(self.route_objects) - 1):
            origin_route_object = route_objects[i]
            dest_route_object = route_objects[i + 1]
            origin_lat = origin_route_object.latitude
            origin_lng = origin_route_object.longitude
            dest_lat = dest_route_object.latitude
            dest_lng = dest_route_object.longitude
            url = DISTANCE_MATRIX_URL
            formatted_url = url.format(origin_lat=origin_lat, origin_lng=origin_lng, dest_lat=dest_lat,
                                       dest_lng=dest_lng, GOOGLE_API_KEY=GOOGLE_API_KEY)
            urls.append(formatted_url)

        computed_distances_and_durations = asyncio.run(google_distance_handler.getRouteDistances(urls))
        for dist_and_dur in computed_distances_and_durations:
            self.distances.append(dist_and_dur['distance'])
            self.durations.append(dist_and_dur['duration'])

        for distance in self.distances:
            self.total_distance += distance

        for duration in self.durations:
            self.total_duration += duration

    def toJson(self):
        print('inside route to json')

        json_route_objects = []
        for route_object in self.route_objects:
            json_route_object = route_object.toJson()
            json_route_objects.append(json_route_object)

        json_route_object = {
            'route_objects': json_route_objects,
            'distances': self.distances,
            'durations': self.durations,
            'total_distance': self.total_distance,
            'total_duration': self.total_duration
        }

        return json_route_object


class RouteOption:
    def __init__(self, baskets:List[List[RouteObject]]):
        self.routes=[]
        self.total_distance = 0
        self.total_duration = 0
        for basket in baskets:
            route = Route(basket)
            self.routes.append(route)

        for route in self.routes:
            self.total_distance += route.total_distance
            self.total_duration += route.total_duration

    def computeTotalDistance(self):

        for route in self.routes:
            route_distance = route.computeTotalDistance()
            route_duration = route.computeTotalDuration()

    def toJson(self):
        print('inside route option to JSON')
        json_routes_arr =[]
        for route in self.routes:
            route_json = route.toJson()
            json_routes_arr.append(route_json)

        json_route_option = {
            'routes': json_routes_arr,
            'total_distance' : self.total_distance,
            'total_duration': self.total_duration
        }

        return json_route_option


class Order (RouteObject):
    def __init__(self, order_object):
        super().__init__()
        self.id = order_object['id']
        self.name = order_object['name']
        self.phone_number = order_object['phone_number']
        self.street = order_object['street']
        self.city = order_object['city']
        self.state = order_object['state']
        self.zipcode = order_object['zipcode']
        self.latitude = order_object['latitude']
        self.longitude = order_object['longitude']
        self.dumpster_size = order_object['dumpster_size']
        self.delivery_date = order_object['delivery_date']
        self.pickup_date = order_object['pickup_date']
        # self.delivery_time = order_object['delivery_time']
        # self.pickup_time = order_object['pickup_time']
        self.special_instructions = order_object['special_instructions']
        self.delivery_completed = order_object['delivery_completed']
        self.pickup_completed = order_object['pickup_completed']
        self.type = order_object['type']
        self.user_id = order_object['user_id']
        self.region_id = order_object['region_id']

    def toJson(self):
        json_object = {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'dumpster_size': self.dumpster_size,
            'delivery_date': self.delivery_date,
            'pickup_date': self.pickup_date,
            'special_instructions': self.special_instructions,
            'delivery_completed': self.delivery_completed,
            'pickup_completed': self.pickup_completed,
            'type': self.type,
            'user_id': self.user_id,
            'region_id': self.region_id
        }

        return json_object

class Vehicle(RouteObject):
    def __init__(self, vehicle_object):
        super().__init__()
        self.id = vehicle_object['id']
        self.start_depot = vehicle_object['start_depot']
        self.end_depot = vehicle_object['end_depot']
        self.license_number = vehicle_object['license_number']
        self.size = vehicle_object['size']
        self.active = vehicle_object['active']
        self.user_id = vehicle_object['user_id']
        self.region_id = vehicle_object['region_id']

    def toJson(self):
        json_object = {
            'id': self.id,
            'start_depot': self.start_depot,
            'end_depot': self.end_depot,
            'license_number': self.license_number,
            'size': self.size,
            'active': self.active,
            'user_id': self.user_id,
            'region_id': self.region_id
        }
        return json_object


class Depot(RouteObject):
    def __init__(self, depot_object):
        super().__init__()
        self.id = depot_object['id']
        self.name = depot_object['name']
        self.street = depot_object['street']
        self.city = depot_object['city']
        self.state = depot_object['state']
        self.zipcode = depot_object['zipcode']
        self.latitude = depot_object['latitude']
        self.longitude = depot_object['longitude']
        self.active = depot_object['active']
        self.type = depot_object['type']
        self.user_id = depot_object['user_id']
        self.region_id = depot_object['region_id']

    def toJson(self):
        json_object ={
            'id': self.id,
            'name': self.name,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'active': self.active,
            'type': self.type,
            'user_id': self.user_id,
            'region_id': self.region_id
        }

        return json_object

class Landfill(RouteObject):
    def __init__(self, landfill_object):
        super().__init__()
        self.id = landfill_object['id']
        self.name = landfill_object['name']
        self.street = landfill_object['street']
        self.city = landfill_object['city']
        self.state = landfill_object['state']
        self.zipcode = landfill_object['zipcode']
        self.latitude = landfill_object['latitude']
        self.longitude = landfill_object['longitude']
        self.active = landfill_object['active']
        self.type = landfill_object['type']
        self.user_id = landfill_object['user_id']
        self.region_id = landfill_object['region_id']

    def toJson(self):
        json_object ={
            'id': self.id,
            'name': self.name,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'active': self.active,
            'type': self.type,
            'user_id': self.user_id,
            'region_id': self.region_id
        }

        return json_object


