import math

from route_classes import Order, Landfill, Depot, Vehicle
from datetime import date, datetime
import random


class OrderType:
    PICKUP = 'PICKUP'
    DELIVERY = 'DELIVERY'
    NONE = 'NONE'

class Coord:
    def __init__(self, lat, lng):
        self.lat = lat
        self.lng = lng

def run(route_query):
    landfills_dict = route_query['landfills']
    depots_dict = route_query['depots']
    orders_dict = route_query['orders']
    vehicles_dict = route_query['vehicles']

    num_of_baskets = len(vehicles_dict)
    route_query = createClasses(landfills_dict, depots_dict, orders_dict, vehicles_dict)
    baskets = createBaskets(route_query, num_of_baskets)

    # todays_date = date.today()
    # NEED TO REPLACE THIS CODE BY FEEDING IN THE ACTUAL DATE THAT I WANT TO ANALYZE FOR THE ROUTES
    # analysis_date = todays_date.strftime('%a %b %d %Y')
    analysis_date = 'Thu Dec 30 2021'

    best_route = []
    opt_dist = 999999
    for i in range(75):
        filled_baskets = fillBaskets(baskets, route_query['landfills'], route_query['depots'], analysis_date)
        total_dist = calculateBasketDistance(filled_baskets)
        if total_dist < opt_dist:
            opt_dist = total_dist
            best_route = filled_baskets

    return best_route



def calculateBasketDistance(baskets):

    dist_var = 0
    for basket in baskets:
        for i in range(len(basket)-2):
            current_route_object = basket[i]
            next_route_object = basket[i+1]
            coord_1 = Coord(current_route_object.latitude, current_route_object.longitude)
            coord_2 = Coord(next_route_object.latitude, next_route_object.longitude)
            dist = calculateDistance(coord_1, coord_2)
            dist_var += dist
    return dist_var


def calculateDistance(coord_1: Coord, coord_2: Coord):
    # Returns the distance between two coordinates in kilometers

    lat_1 = coord_1.lat
    lng_1 = coord_1.lng

    lat_2 = coord_2.lat
    lng_2 = coord_2.lng

    R = 6371e3
    phi_1 = lat_1*math.pi/180
    phi_2 = lat_2*math.pi/180
    delta_phi = (lat_2-lat_1)*math.pi/180
    delta_lambda = (lng_2-lng_1)*math.pi/180

    a = math.sin(delta_phi/2)*math.sin(delta_phi/2)+math.cos(phi_1)*math.cos(phi_2)*math.sin(delta_lambda/1)*math.sin(delta_lambda/2)
    c = 2*math.atan2(math.sqrt(a),math.sqrt(1-a))
    d = R*c/1000
    return d

def createBaskets(route_query, num_of_baskets):

    orders_list = route_query['orders']
    num_of_orders = len(orders_list)

    baskets = []
    for i in range(num_of_orders):
        baskets.append([])


    orders_left = num_of_orders
    while orders_left > 0:
        order_index = random.randint(0,orders_left-1)
        basket_index = random.randint(0,num_of_baskets-1)

        order = orders_list[order_index]
        baskets[basket_index].append(order)
        del orders_list[order_index]
        orders_left = orders_left -1

    return baskets

def createClasses(landfills_dict, depots_dict, orders_dict, vehicles_dict):

    orders = []
    for order in orders_dict:
        new_order = Order(order)
        orders.append(new_order)

    landfills = []
    for landfill in landfills_dict:
        new_landfill = Landfill(landfill)
        landfills.append(new_landfill)

    depots = []
    for depot in depots_dict:
        new_depot = Depot(depot)
        depots.append(new_depot)

    vehicles = []
    for vehicle in vehicles_dict:
        new_vehicle = Vehicle(vehicle)
        vehicles.append(new_vehicle)

    route_query = {
        'orders': orders,
        'landfills': landfills,
        'depots': depots,
        'vehicles': vehicles
    }

    return route_query


# This is the first version of fill baskets. It just randomly fills the different baskets based on how many vehicles
# were passed in to the function. I need to create another version that ensures even splitting of the orders.
def fillBaskets(baskets, landfills, depots, analysis_date):

    filled_baskets = []
    for basket in baskets:
        new_basket= []

        if len(basket) > 0:
            for i in range(len(basket)-1):
                current_order:Order = basket[i]
                next_order = basket[i+1]

                current_order_size = current_order.dumpster_size
                next_order_size = next_order.dumpster_size

                current_order_pickup_date = current_order.pickup_date
                current_order_delivery_date = current_order.delivery_date

                next_order_pickup_date = next_order.pickup_date
                next_order_delivery_date = next_order.delivery_date



                current_order_type = 'NONE'

                if current_order_pickup_date == analysis_date and current_order.pickup_completed == False:
                    current_order_type = OrderType.PICKUP
                elif current_order_delivery_date == analysis_date and current_order.delivery_completed == False:
                    current_order_type = OrderType.DELIVERY
                else:
                    current_order_type = OrderType.NONE

                next_order_type = 'NONE'

                if next_order_pickup_date == analysis_date and next_order.pickup_completed == False:
                    next_order_type = OrderType.PICKUP
                elif next_order_delivery_date == analysis_date and next_order.delivery_completed == False:
                    next_order_type = OrderType.DELIVERY
                else:
                    next_order_type = OrderType.NONE

                if current_order_type == OrderType.PICKUP and next_order_type == OrderType.PICKUP:
                    landfill_depot = getOptimumLandfillDepot(current_order, next_order, landfills, depots)
                    new_basket += [current_order]
                    new_basket += [landfill_depot]
                elif current_order_type == OrderType.PICKUP and next_order_type == OrderType.DELIVERY:
                    if current_order_size == next_order_size:
                        landfill = getOptimumLandfill(current_order, next_order, landfills)
                        new_basket += current_order
                        new_basket += [landfill]
                    else:
                        landfill_depot = getOptimumLandfillDepot(current_order, next_order, landfills, depots)
                        new_basket += [current_order]
                        new_basket += [landfill_depot]
                elif current_order_type == OrderType.DELIVERY and next_order_type == OrderType.PICKUP:
                    new_basket += [current_order]
                elif current_order_type == OrderType.DELIVERY and next_order_type == OrderType.DELIVERY:
                    depot = getOptimumDepot(current_order, next_order, depots)
                    new_basket += [current_order]
                    new_basket += [depot]
                # NEED TO INSER THE REST OF THE RULES HERE

                if i == len(basket)-2:
                    new_basket += [next_order]

            if len(basket)==1:
                current_order = basket[0]
                new_basket += [current_order]

            depot_dist_matrix = []
            for depot in depots:
                coord_1 = Coord(depot.latitude, depot.longitude)
                coord_2 = Coord(basket[0].latitude, basket[0].longitude)
                initial_dist = calculateDistance(coord_1, coord_2)

                coord_3 = Coord(basket[-1].latitude, basket[-1].longitude)
                ending_dist =calculateDistance(coord_3, coord_1)

                total_dist = initial_dist + ending_dist
                depot_dist_matrix.append(total_dist)
            min_index = depot_dist_matrix.index(min(depot_dist_matrix))

            ideal_depot = depots[min_index]
            new_basket.insert(0, ideal_depot)
            new_basket.append(ideal_depot)

        filled_baskets.append(new_basket)




    return filled_baskets

def getOptimumDepot(current_order, next_order, depots):
    combo_set = []
    for depot in depots:
        combo = [current_order, depot, next_order]
        combo_set.append(combo)
    distance_arr = []
    for set in combo_set:
        total_distance = 0
        for i in range(len(set) - 1):
            current_set_data = set[i]
            next_set_data = set[i + 1]

            coord_1 = Coord(current_set_data.latitude, current_set_data.longitude)
            coord_2 = Coord(next_set_data.latitude, next_set_data.longitude)

            distance_btw_coord = calculateDistance(coord_1, coord_2)

            total_distance += distance_btw_coord
        distance_arr.append(total_distance)

    min_index = distance_arr.index(min(distance_arr))
    optimum_combo_set = combo_set[min_index]
    depot = optimum_combo_set[1]
    return depot

def getOptimumLandfill(current_order, next_order, landfills):
    combo_set = []
    for landfill in landfills:
        combo = [current_order, landfill, next_order]
        combo_set.append(combo)
    distance_arr = []
    for set in combo_set:
        total_distance = 0
        for i in range(len(set)-1):
            current_set_data = set[i]
            next_set_data = set[i+1]

            coord_1 = Coord(current_set_data.latitude, current_set_data.longitude)
            coord_2 = Coord(next_set_data.latitude, next_set_data.longitude)

            distance_btw_coord = calculateDistance(coord_1, coord_2)

            total_distance += distance_btw_coord
        distance_arr.append(total_distance)

    min_index = distance_arr.index(min(distance_arr))
    optimum_combo_set = combo_set[min_index]
    landfill = [optimum_combo_set[1]]
    return landfill

def getOptimumLandfillDepot(current_order, next_order, landfills, depots):
    combo_set = []
    for landfill in landfills:
        for depot in depots:
            combo = [current_order, landfill, depot, next_order]
            combo_set.append(combo)
    distance_arr = []
    for set in combo_set:
        total_distance = 0
        for i in range(len(set)-1):
            current_set_data = set[i]
            next_set_data = set[i+1]

            coord_1 = Coord(current_set_data.latitude, current_set_data.longitude)
            coord_2 = Coord(next_set_data.latitude, next_set_data.longitude)

            distance_btw_coord = calculateDistance(coord_1, coord_2)

            total_distance += distance_btw_coord
        distance_arr.append(total_distance)

    min_index = distance_arr.index(min(distance_arr))
    optimum_combo_set = combo_set[min_index]
    landfill_depot_selected = [optimum_combo_set[1], optimum_combo_set[2]]
    return landfill_depot_selected






if __name__ =="__main__":
    coord_1 = Coord(33.93462, -84.318291)
    coord_2 = Coord(34.09125, -84.33947)

    dist = calculateDistance(coord_1, coord_2)
    print(dist)
