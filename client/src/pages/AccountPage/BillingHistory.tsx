const BillingHistory = () => {
    // This data should actually come from your API call to the server
    const invoiceData = [
      { invoiceNo: 'INV-001', date: 'June 5, 2023', amount: '$150', status: 'Paid' },
      { invoiceNo: 'INV-002', date: 'May 5, 2023', amount: '$150', status: 'Paid' },
      { invoiceNo: 'INV-003', date: 'April 5, 2023', amount: '$150', status: 'Paid' },
      { invoiceNo: 'INV-004', date: 'March 5, 2023', amount: '$150', status: 'Paid' },
    ];
  
    return (
      <div className="bg-white border rounded-lg mb-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-green-dumpster text-left px-6 py-4">Billing History</h2>
        <hr className="border-gray-200" />
        <div className="px-6 py-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoiceData.map((invoice, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.invoiceNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-dumpster">{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>
    );
  };
  
  export default BillingHistory;
  