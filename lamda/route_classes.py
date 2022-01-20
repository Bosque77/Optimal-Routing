
class RouteObject:
    def __init__(self):
        print('created route object')

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
        self.user_id = order_object['user_id']
        self.region_id = order_object['region_id']

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
        self.user_id = depot_object['user_id']
        self.region_id = depot_object['region_id']

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
        self.user_id = landfill_object['user_id']
        self.region_id = landfill_object['region_id']


