import { CheckCircleIcon } from '@heroicons/react/24/solid';

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


const BasicTierCard = () => {
  return (
    <div className="flex space-x-4">

        <div  className="bg-white shadow-md rounded-lg p-6">

        </div>

    </div>
  );
};

export default BasicTierCard;
