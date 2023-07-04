const PersonalInformation = () => {
  return (
    <div className="flex flex-col">
      <section className="flex justify-start ">
        <div className="border rounded-lg py-4">
          <div className="flex justify-start font-semibold py-2 rounded px-4">
            Personal Information
          </div>
          <hr className="border-gray-200 my-4 border-t-2" />
          <div className="flex flex-col mt-6 px-4">
            <label className="flex justify-start font-medium text-gray-800">
              Full Name
            </label>
            <div className="grid gap-4 grid-cols-2">
              <input
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-64"
                placeholder="First Name"
              />
              <input
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-64"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="flex flex-col mt-6 px-4">
            <label className="flex justify-start font-medium text-gray-800">
              Email Address
            </label>
            <input
              className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-full"
              placeholder="your-email@gmail.com"
            />
          </div>
          <div className="flex flex-col mt-6 px-4">
            <label className="flex justify-start font-medium text-gray-800">
              Phone Number
            </label>
            <input
              className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-full"
              placeholder="012-345-6789"
            />
          </div>
          <div className="flex justify-end mx-4 mt-4">
          <button className="rounded border px-4 py-2 bg-primary text-white font-semibold active:scale-95">Save</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalInformation;
