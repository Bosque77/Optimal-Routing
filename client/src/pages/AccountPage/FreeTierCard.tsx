import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Tier {
  name: string;
  features: {
    dumpsters: number;
    landfills: number;
    regions: number;
    ordersPerDay: number;
    routeGenerationsPerDay: number;
  };
}

const FreeTierCard = () => {
  return (
    <div className="flex flex-col shadow border rounded-lg py-6">
      <section className="flex flex-row px-6">
        <div className="flex flex-col grow">
          <div className="flex items-center mb-2">
            <p className="font-semibold text-xl mr-4">Free plan</p>
            {/* <div className="flex flex-row items-center bg-primary text-white rounded-full px-2  text-sm py-0">
              Current Plan
            </div> */}
          </div>

          <div className="flex justify-start text-gray-600">
            Basic features and reporting
          </div>
        </div>
        <div>
          <span className="text-2xl">$0</span>
          <span className="text-gray-600">per month</span>
        </div>
      </section>
      <hr className="border-gray-200 my-6 border-t-2" />
      <section className="px-6">
        <h2 className="flex justify-start font-medium mb-2">FEATURES</h2>
        <div className="grid grid-cols-1 gap-y-3 text-left ml-6 mt-6 text-gray-600 text-sm">
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> 1 Region</p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> 20 Orders / Day</p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> 5 Landfills / Region</p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> 5 Depots / Region</p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> 20 Optimizations /day</p>

        </div>
      </section>
    </div>
  );
};

export default FreeTierCard;
