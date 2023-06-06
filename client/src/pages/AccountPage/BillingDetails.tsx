const BillingDetails = () => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-dumpster">Billing Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <h3 className="font-semibold text-gray-700">Current Plan:</h3>
          <p>Premium Dumpster Service</p>
          <h3 className="font-semibold text-gray-700">Cost:</h3>
          <p>$150/month</p>
          <h3 className="font-semibold text-gray-700">Next Payment Date:</h3>
          <p>July 5, 2023</p>
        </div>
      </div>
    );
  }
  
  export default BillingDetails;
  
  