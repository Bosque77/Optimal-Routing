import { HomeIcon } from '@heroicons/react/24/outline'


const AccountSideNav = () => {
  return (
    <div className="w-64 bg-gray-50 flex flex-col px-4">
      <section>
      <h1 className="relative flex justify-start font-semibold ml-10 py-2 mt-6 text-gray-500 ">
          <HomeIcon className="h-5 w-5 absolute left-[-2rem] text-gray-500" />
          General Settings
        </h1>
        <div className="flex justify-start font-semibold pl-10 py-2 hover:bg-gray-300 rounded">General Details</div>
        <div className="flex justify-start font-semibold pl-10 py-2 hover:bg-gray-300 rounded">User Permissions</div>
        <div className="flex justify-start font-semibold pl-10 py-2 hover:bg-gray-300 rounded">Billing</div>
        <div className="flex justify-start font-semibold pl-10 py-2 hover:bg-gray-300 rounded">Payments</div>

      </section>

    </div>
  );
};

export default AccountSideNav;


{/* <section>
<h1>Personal Settings</h1>
<div>Plans</div>
<div>Notification</div>
<div>Domain</div>
<div>Languages</div>
</section> */}