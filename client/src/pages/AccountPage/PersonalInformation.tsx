import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, actionCreators } from "state";
import { HttpResponse, User } from "../../../../shared/types";
import { bindActionCreators } from "redux";
import { showAlert } from "state/action-creators";

const PersonalInformation = () => {
  const dispatch = useDispatch();

  const { updateUser, showAlert } = bindActionCreators(actionCreators, dispatch);

  const user_info = useSelector((state: State) => state.user);

  // Create a local state variable to hold the user information
  const [userInfo, setUserInfo] = useState<Partial<User>>();


  useEffect(() => {
    // Update userInfo whenever user_info changes
    setUserInfo(user_info!);
  }, [user_info]);


  // Function to handle input changes and update the local state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== undefined) {
      setUserInfo((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  // Function to handle saving the changes
  const handleSave = async () => {
    if (userInfo) {
      try {
        // Assuming updateUser returns a Promise that resolves to a response
        const response = (await updateUser(
          userInfo as User
        )) as unknown as HttpResponse;

        console.log(response)

        if (response.status === "ERROR") {
          showAlert("Update failed. Please try again later.", "error");
        } else {
          showAlert("User information updated", "success");
        }
      } catch (error) {
        // Handle any errors that occurred while updating the user information
        showAlert(
          "An error occurred while updating the user information. Please try again later.",
          "error"
        );
      }
    }
  };

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
            name="first_name"
            className="border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-64"
            value={userInfo?.first_name || ""}
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            name="last_name"
            className="border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-64"
            value={userInfo?.last_name || ""}
            placeholder="Last Name"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col mt-6 px-4">
        <label className="flex justify-start font-medium text-gray-800">
          Email Address
        </label>
        <input
          name="email"
          className="border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-full"
          value={userInfo?.email || ""}
          placeholder="your-email@gmail.com"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mt-6 px-4">
        <label className="flex justify-start font-medium text-gray-800">
          Phone Number
        </label>
        <input
          name="phone_number"
          className="border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-full"
          value={userInfo?.phone_number || ""}
          placeholder="012-345-6789"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end mx-4 mt-4">
        <button
          onClick={handleSave}
          className="rounded border px-4 py-2 bg-primary text-white font-semibold active:scale-95"
        >
          Save
        </button>
      </div>
    </div>
  </section>
</div>

  );
};

export default PersonalInformation;
