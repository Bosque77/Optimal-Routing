const TierCard = () => {
    const tiers = [
      {
        name: 'Free Tier',
        features: {
          dumpsters: 5,
          landfills: 5,
          regions: 1,
          ordersPerDay: 25,
          routeGenerationsPerDay: 20,
        },
      },
      {
        name: 'Paid Tier',
        features: {
          dumpsters: 20,
          landfills: 20,
          regions: 5,
          ordersPerDay: 100,
          routeGenerationsPerDay: 100,
        },
      },
    ];
  
    return (
      <div className="flex space-x-4">
        {tiers.map((tier, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-green-dumpster">{tier.name}</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>{tier.features.dumpsters} dumpsters</li>
              <li>{tier.features.landfills} landfills</li>
              <li>{tier.features.regions} region(s)</li>
              <li>{tier.features.ordersPerDay} orders/day</li>
              <li>{tier.features.routeGenerationsPerDay} route generations/day</li>
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default TierCard;
  