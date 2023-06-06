import { useState } from 'react';

const AccountSettings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit the new username and password.
    // This is where you would typically interact with your API.
    console.log(username, password, email, phoneNumber, address);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2 text-green-dumpster">Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Username</label>
            <input className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
            <input className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
            <input className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Phone Number</label>
            <input className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Address</label>
            <textarea className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-green-dumpster hover:bg-green-dark text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline w-full text-sm"
            type="submit">Update Account</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
