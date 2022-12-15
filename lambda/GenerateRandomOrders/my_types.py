from typing import TypedDict


# TYPINGS
Order = TypedDict('Order',
                  {
                      'name': str,
                      'email': str,
                      'phone_number': str,
                      'street': str,
                      'city': str,
                      'state': str,
                      'zipcode': int,
                      'latitude': float,
                      'longitude': float,
                      'dumpster_size': int,
                      'delivery_date': str,
                      'pickup_date': str,
                      'delivery_time': str,
                      'pickup_time': str,
                      'special_instructions': str,
                      'delivery_completed': bool,
                      'pickup_completed': bool,
                      'active': bool,
                      'user_id': str,
                      'region_id': str,
                      'type': str
                  }
                  )
