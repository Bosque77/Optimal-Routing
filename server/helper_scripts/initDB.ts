/* eslint-disable @typescript-eslint/no-floating-promises */
import bcrypt from "bcrypt";
const salt_rounds = 10;

import mongoose from "mongoose";
import config from "../utils/config";
import logger from "../utils/logger";
import User from "../models/user-model";
import Region from "../models/region-model";
import Landfill from "../models/landfill-model";
import Driver from "../models/driver-model";
import Depot from "../models/depot-model";
import Vehicle from "../models/vehicle-model";
import Order from "../models/order-model";
import Route from "../models/route-model";

// a function that creates the delivery date and pickup date for the order
// the delivery date is today and the pickup date is tomorrow

interface DateObject {
  delivery_date: string;
  pickup_date: string;
}

const createDates = (): DateObject => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const delivery_date = today.toDateString();
  const pickup_date = tomorrow.toDateString();

  return { delivery_date, pickup_date };
};

const { delivery_date, pickup_date } = createDates();

console.log(delivery_date, pickup_date);

const users = [
  {
    username: "user_1",
    password: "password123",
    email: "user_1@gmail.com",
    passwordHash:
      "$2b$10$drQ3m/uP5sejRRlfHNwNfu4Esxec454XqrE9j6ivWG8E/pYa4HF1u",
    _id: "61c7483607e4533869b9ec08",
  },
  {
    username: "user_2",
    password: "password1234",
    email: "user_2@gmail.com",
    passwordHash:
      "$2b$10$//cykx4aefD9n4YOKYB7kuFGGoHto3izcLWxvmgyZSc0GnAIf8Oh6",
    _id: "61c7483607e4533869b9ec09",
  },
];

const regions = [
  {
    name: "Default",
    user_id: "61c7483607e4533869b9ec08",
    latitude: 33.7488,
    longitude: -84.3877,
    _id: "61ca3cb19e9ade7351418e30",
  },
  {
    name: "Atlanta",
    user_id: "61c7483607e4533869b9ec08",
    latitude: 33.7488,
    longitude: -84.3877,
    _id: "61ca3cb19e9ade7351418e31",
  },
  {
    name: "Woodstock",
    user_id: "61c7483607e4533869b9ec08",
    latitude: 34.1015,
    longitude: -84.5194,
    _id: "61ca3cb19e9ade7351418e32",
  },
];

const landfills = [
  {
    _id: "645316a283f170ee959170f5",
    name: "Doraville Transfer Station",
    street: "2784 Woodwin Rd,",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30360,
    latitude: 33.918,
    longitude: -84.275,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Landfill",
  },
  {
    _id: "645316a283f170ee959170f6",
    name: "Cobb County Landfill",
    street: "1775 County Services Pkwy SW",
    city: "Marietta",
    state: "Georgia",
    zipcode: 30008,
    latitude: 33.907,
    longitude: -84.581,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Landfill",
  },
  {
    _id: "645316a283f170ee959170f7",
    name: "Republic Services of Atlanta",
    street: "3045 Donald Lee Hollowell Parkway Northwest",
    city: "Woodstock",
    state: "Georgia",
    zipcode: 30318,
    latitude: 33.784,
    longitude: -84.487,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Landfill",
  },
  {
    _id: "645316a283f170ee959170f8",
    name: "Waste Management - Atlanta West Hauling",
    street: "3001 S Pioneer Dr SE",
    city: "Smyrna",
    state: "Georgia",
    zipcode: 30082,
    latitude: 33.823,
    longitude: -84.496,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Landfill",
  },
  {
    _id: "645719e92d77892b6ee36f53",
    name: "Doraville Transfer Station",
    street: "2784 Woodwin Rd,",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30360,
    latitude: 33.918,
    longitude: -84.275,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e31",
    type: "Landfill",
  },
];

const drivers = [
  {
    name: "Forest Schwartz",
    phone_number: "404-617-9402",
    email: "forestschwrtz@gmail.com",
    password: "password123",
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
  },
  {
    name: "Ralph McGrew",
    phone_number: "404-861-4598",
    email: "rgMcgrew@gmail.com",
    password: "password123",
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
  },
  {
    name: "Sarah Mclellon",
    phone_number: "404-684-7598",
    email: "sarah.mclellon@gmail.com",
    password: "password123",
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
  },
];

const depots = [
  {
    _id: "61cdeb3f291ff09681e49c09",
    name: "Depot 1",
    street: "2021, Dahlonega Highway",
    city: "Cumming",
    state: "Georgia",
    zipcode: 30040,
    latitude: 34.25,
    longitude: -84.111,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Depot",
  },
  {
    _id: "61cdeb3f291ff09681e49c08",
    name: "Depot 2",
    street: "1280 Peachtree St NE",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30309,
    latitude: 33.79,
    longitude: -84.389,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Depot",
  },
    {
      _id: "6457192c0243f4282c45598d",
      name: "Depot 2",
      street: "1280 Peachtree St NE",
      city: "Atlanta",
      state: "Georgia",
      zipcode: 30309,
      latitude: 33.79,
      longitude: -84.389,
      active: true,
      user_id: "61c7483607e4533869b9ec08",
      region_id: "61ca3cb19e9ade7351418e31",
      type: "Depot",
  },
];

const vehicles = [
  {
    start_depot: "61cdeb3f291ff09681e49c09",
    end_depot: "61cdeb3f291ff09681e49c09",
    license_number: "AJXIV",
    size: 50,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
  },
  {
    start_depot: "61cdeb3f291ff09681e49c09",
    end_depot: "61cdeb3f291ff09681e49c09",
    license_number: "TTXDVG",
    size: 50,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
  },
  {
    start_depot: "61cdeb3f291ff09681e49c09",
    end_depot: "61cdeb3f291ff09681e49c09",
    license_number: "XXDTGE",
    size: 50,
    active: true,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
  },
];

const orders = [
  {
    _id: "644df6d8c4e5d698c11840da",
    name: "Forest Schwartz",
    email: "forestschwrtz@gmail.com",
    phone_number: "404-617-9402",
    street: "4703 Cambridge Dr.",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30338,
    latitude: 33.935,
    longitude: -84.318,
    dumpster_size: 15,
    delivery_date: delivery_date,
    pickup_date: pickup_date,
    delivery_time: {
      hour: 12,
      minute: 35,
      am_pm: "AM",
    },
    pickup_time: {
      hour: 5,
      minute: 45,
      am_pm: "PM",
    },
    special_instructions: "Please come early",
    delivery_completed: false,
    pickup_completed: false,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Order",
    active: true,
  },
  {
    _id: "644df6d8c4e5d698c11840d7",
    name: "Josh Rodriguez",
    email: "jr@gmail.com",
    phone_number: "404-585-8945",
    street: "3380 Peachtree Rd NE",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30326,
    latitude: 33.849,
    longitude: -84.363,
    dumpster_size: 15,
    delivery_date: "Wed Dec 29 2021",
    pickup_date: "Thu Dec 30 2021",
    delivery_time: {
      hour: 12,
      minute: 35,
      am_pm: "AM",
    },
    pickup_time: {
      hour: 5,
      minute: 45,
      am_pm: "PM",
    },
    special_instructions: "Please come early",
    delivery_completed: true,
    pickup_completed: false,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Order",
    active: true,
  },
  {
    _id: "644df6d8c4e5d698c11840d9",
    name: "Daniel Carusi",
    email: "d.carusi@gmail.com",
    phone_number: "485-859-8569",
    street: "300 Oakland Ave SE",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30312,
    latitude: 33.746,
    longitude: -84.376,
    dumpster_size: 30,
    delivery_date: "Thu Dec 30 2021",
    pickup_date: "Wed Jan 05 2022",
    delivery_time: {
      hour: 12,
      minute: 35,
      am_pm: "AM",
    },
    pickup_time: {
      hour: 5,
      minute: 45,
      am_pm: "PM",
    },
    special_instructions: "Please come early",
    delivery_completed: false,
    pickup_completed: false,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Order",
    active: true,
  },
  {
    _id: "644df6d8c4e5d698c11840d8",
    name: "Michael Lee",
    email: "michael.lee@gmail.com",
    phone_number: "212-555-0123",
    street: "1270 Spring St NW",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30309,
    latitude: 33.7830,
    longitude: -84.3893,
    dumpster_size: 10,
    delivery_date: delivery_date,
    pickup_date: pickup_date,
    delivery_time: {
      hour: 9,
      minute: 30,
      am_pm: "AM",
    },
    pickup_time: {
      hour: 6,
      minute: 15,
      am_pm: "PM",
    },
    special_instructions: "Please call before delivery",
    delivery_completed: false,
    pickup_completed: false,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Order",
    active: true,
  },
  {
    _id: "644df6d8c4e5d698c11840db",
    name: "Jane Doe",
    email: "janedoe@yahoo.com",
    phone_number: "555-123-4567",
    street: "415 East Paces Ferry Rd NE",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30305,
    latitude: 33.8412,
    longitude: -84.3720,
    dumpster_size: 20,
    delivery_date: delivery_date,
    pickup_date: pickup_date,
    delivery_time: {
      hour: 2,
      minute: 45,
      am_pm: "PM",
    },
    pickup_time: {
      hour: 9,
      minute: 0,
      am_pm: "AM",
    },
    special_instructions: "Please park in driveway",
    delivery_completed: false,
    pickup_completed: false,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Order",
    active: true,
  },
  {
    _id: "644df6d8c4e5d698c11840dc",
    name: "John Smith",
    email: "johnsmith@gmail.com",
    phone_number: "800-555-5555",
    street: "290 Martin Luther King Jr Dr SE",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30312,
    latitude: 33.7490,
    longitude: -84.3844,
    dumpster_size: 30,
    delivery_date: delivery_date,
    pickup_date: pickup_date,
    delivery_time: {
      hour: 11,
      minute: 0,
      am_pm: "AM",
    },
    pickup_time: {
      hour: 7,
      minute: 30,
      am_pm: "PM",
    },
    special_instructions: "Please park in driveway",
    delivery_completed: false,
    pickup_completed: false,
    user_id: "61c7483607e4533869b9ec08",
    region_id: "61ca3cb19e9ade7351418e30",
    type: "Order",
    active: true,
  },
];

const routes = [
  {
    user_id: "61c7483607e4533869b9ec08",
    date: delivery_date,
    distances: [798, 1344, 8432, 7616, 5522, 6677, 22375, 22189],
    durations: [132, 218, 735, 693, 452, 525, 1248, 1149],
    region_id: "61ca3cb19e9ade7351418e30",
    route_items: ['61cdeb3f291ff09681e49c08', '644df6d8c4e5d698c11840d8', '61cdeb3f291ff09681e49c08', '644df6d8c4e5d698c11840db', '61cdeb3f291ff09681e49c08', '644df6d8c4e5d698c11840dc', '61cdeb3f291ff09681e49c08', '644df6d8c4e5d698c11840da', '61cdeb3f291ff09681e49c08'],
    route_types: ['Depot', 'Order', 'Depot', 'Order', 'Depot', 'Order', 'Depot', 'Order', 'Depot'],
    total_distance: 74953,
    total_duration: 5152,
  },
];

const connectMongoose = async () => {
  if (config.MONGODB_URI) {
    await mongoose
      .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        logger.info("connected to MongoDB");
      })
      .catch((error) => {
        logger.error("error connection to MongoDB:", error.message);
      });
  }
};

const initUsers = async () => {
  await User.deleteMany({});
  const user_objects = users.map(
    (user) =>
      new User({
        _id: user._id,
        username: user.username,
        passwordHash: user.passwordHash,
        email: user.email,
      })
  );
  const promise_array = user_objects.map((user) => user.save());
  await Promise.all(promise_array);
};

const initRegions = async () => {
  await Region.deleteMany({});
  const region_objects = regions.map((region) => new Region({ ...region }));
  const promise_array = region_objects.map((region) => region.save());
  await Promise.all(promise_array);
};

const initLandfills = async () => {
  await Landfill.deleteMany({});
  const landfill_objects = landfills.map(
    (landfill) => new Landfill({ ...landfill })
  );
  const promise_array = landfill_objects.map((landfill) => landfill.save());
  await Promise.all(promise_array);
};

const initDrivers = async () => {
  await Driver.deleteMany({});
  const drivers_w_passwordHash = await Promise.all(
    drivers.map(async (driver) => {
      const password_hash = await bcrypt.hash(driver.password, salt_rounds);
      const updated_driver = {
        name: driver.name,
        phone_number: driver.phone_number,
        email: driver.email,
        active: driver.active,
        user_id: driver.user_id,
        region_id: driver.region_id,
        password_hash,
      };
      return updated_driver;
    })
  );
  const driver_objects = drivers_w_passwordHash.map(
    (driver) => new Driver({ ...driver })
  );
  const promise_array = driver_objects.map((driver) => driver.save());
  await Promise.all(promise_array);
};

const initDepots = async () => {
  await Depot.deleteMany({});
  const depot_objects = depots.map((depot) => new Depot({ ...depot }));
  const promise_array = depot_objects.map((depot) => depot.save());
  await Promise.all(promise_array);
};

const initVehicles = async () => {
  await Vehicle.deleteMany({});
  const vehicle_objects = vehicles.map(
    (vehicle) => new Vehicle({ ...vehicle })
  );
  const promise_array = vehicle_objects.map((vehicle) => vehicle.save());
  await Promise.all(promise_array);
};

const initOrders = async () => {
  await Order.deleteMany({});
  const order_objects = orders.map((order) => new Order({ ...order }));
  const promise_array = order_objects.map((order) => order.save());
  await Promise.all(promise_array);
};

const initTruckRoutes = async () => {
  await Route.deleteMany({});
  const route_objects = routes.map((route) => new Route({ ...route }));
  const promise_array = route_objects.map((route) => route.save());
  await Promise.all(promise_array);
};

const runInit = async () => {
  await connectMongoose();
  await initUsers();
  await initRegions();
  await initLandfills();
  await initDrivers();
  await initDepots();
  await initVehicles();
  await initOrders();
  await initTruckRoutes();
  mongoose.disconnect();
  console.log("finished writing data to database");
};

runInit();
