import { Order } from "./types";

export const orders: Order[] = [
    {
        id: '1',
        name: 'Forest Schwartz',
        email: 'forestschwrtz@gmail.com',
        phone_number: '404-617-9402',
        street: '4703 Cambridge Dr.',
        city: 'Atlanta',
        state: 'Georgia',
        zipcode: 30338,
        latitude: 33.935,
        longitude: -84.318,
        dumpster_size: 15,
        delivery_date: 'Thu Dec 30 2021',
        pickup_date: 'Fri Dec 31 2021',
        delivery_time: {
            hour: 12,
            minute: 35,
            am_pm: 'AM'
        },
        pickup_time: {
            hour: 5,
            minute: 45,
            am_pm: 'PM'
        },
        special_instructions: 'Please come early',
        delivery_completed: false,
        pickup_completed: false,
        user_id: '61c7483607e4533869b9ec08',
        region_id: '61ca3cb19e9ade7351418e30',
        type: 'Order'
    },
    {
        id: '2',
        name: 'Josh Rodriguez',
        email: 'jr@gmail.com',
        phone_number: '404-585-8945',
        street: '225 Baker St NW',
        city: 'Atlanta',
        state: 'Georgia',
        zipcode: 30313,
        latitude: 33.764,
        longitude: -84.395,
        dumpster_size: 15,
        delivery_date: 'Wed Dec 29 2021',
        pickup_date: 'Thu Dec 30 2021',
        delivery_time: {
            hour: 12,
            minute: 35,
            am_pm: 'AM'
        },
        pickup_time: {
            hour: 5,
            minute: 45,
            am_pm: 'PM'
        },
        special_instructions: 'Please come early',
        delivery_completed: true,
        pickup_completed: false,
        user_id: '61c7483607e4533869b9ec08',
        region_id: '61ca3cb19e9ade7351418e30',
        type: 'Order'
    },
    {   
        id: '3',
        name: 'Daniel Carusi',
        email: 'd.carusi@gmail.com',
        phone_number: '485-859-8569',
        street: '690 Olde Rope Mill Park Rd',
        city: 'Woodstock',
        state: 'Georgia',
        zipcode: 30188,
        latitude: 34.131,
        longitude: -84.523,
        dumpster_size: 30,
        delivery_date: 'Thu Dec 30 2021',
        pickup_date: 'Wed Jan 05 2022',
        delivery_time: {
            hour: 12,
            minute: 35,
            am_pm: 'AM'
        },
        pickup_time: {
            hour: 5,
            minute: 45,
            am_pm: 'PM'
        },
        special_instructions: 'Please come early',
        delivery_completed: false,
        pickup_completed: false,
        user_id: '61c7483607e4533869b9ec08',
        region_id: '61ca3cb19e9ade7351418e30',
        type: 'Order'
    },
    {   
        id: '4',
        name: 'Big Dog',
        email: 'd.carusi@gmail.com',
        phone_number: '485-859-8569',
        street: '690 Olde Rope Mill Park Rd',
        city: 'Woodstock',
        state: 'Georgia',
        zipcode: 30188,
        latitude: 34.131,
        longitude: -84.523,
        dumpster_size: 30,
        delivery_date: 'Thu Dec 30 2021',
        pickup_date: 'Wed Jan 05 2022',
        delivery_time: {
            hour: 12,
            minute: 35,
            am_pm: 'AM'
        },
        pickup_time: {
            hour: 5,
            minute: 45,
            am_pm: 'PM'
        },
        special_instructions: 'Please come early',
        delivery_completed: false,
        pickup_completed: false,
        user_id: '61c7483607e4533869b9ec08',
        region_id: '61ca3cb19e9ade7351418e30',
        type: 'Order'
    },

]