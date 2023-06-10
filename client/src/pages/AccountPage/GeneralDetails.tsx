const GeneralDetails = () => {
  return (
    <div className="flex flex-col">
      <section>
        <div className="flex flex-row bg-gray">
          <h1 className="flex justify-start font-bold text-2xl text-gray-800 grow">
            General Details
          </h1>
          <button className="rounded border px-4 py-2 bg-mygreen text-white font-semibold">Save</button>
        </div>

        <p className="flex justify-start text-gray-600 mt-4">
          {" "}
          Update your photo and personal details here.{" "}
        </p>
      </section>

      <section className="flex justify-start  mt-8 ">
        <div className="border w-1/2 rounded-lg py-4">
          <div className="flex justify-start font-semibold py-2 hover:bg-gray-300 rounded px-4">
            Personal Informaiton
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
        </div>
      </section>
    </div>
  );
};

export default GeneralDetails;
