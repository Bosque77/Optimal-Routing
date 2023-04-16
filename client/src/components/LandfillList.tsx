import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Landfill } from "../types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

interface prop {
  landfills: Landfill[];
  setCreateLandfillModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setLandfill: React.Dispatch<React.SetStateAction<Landfill | undefined>>;
  setConfirmDeleteActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const LandfillList = ({
  landfills,
  setCreateLandfillModalActive,
  setConfirmDeleteActive,
  setLandfill,
}: prop) => {
  const dispatch = useDispatch();

  const { updateLandfill } = bindActionCreators(actionCreators, dispatch);

  // const changeLandfillStatus = (landfill: Landfill) => {
  //   console.log("inside on click");
  //   const new_landfill = { ...landfill };
  //   if (landfill.active) {
  //     new_landfill.active = false;
  //   } else {
  //     new_landfill.active = true;
  //   }
  //   updateLandfill(new_landfill);
  // };

  const onEditLandfill = (landfill: Landfill) => {
    setLandfill(landfill);
    setCreateLandfillModalActive(true);
  };

  const onDeleteLandfill = (landfill: Landfill) => {
    console.log("inside delete landfill");
    setLandfill(landfill);
    setConfirmDeleteActive(true);
  };

  const insertLandfills = () => {
    return landfills.map((landfill) => (
      <tr key={landfill.id} className="border-b bg-white">
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {landfill.name}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {landfill.street}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {landfill.city}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
          {landfill.zipcode}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
          {landfill.latitude}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
          {landfill.longitude}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <button onClick={() => onEditLandfill(landfill)}>
            <PencilIcon className="w-6 h-6 mr-3 black stroke-0 cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </button>
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <button onClick={() => onDeleteLandfill(landfill)}>
            <TrashIcon className="w-6 h-6 mr-3 black stroke-0  cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-fullmt-2 bg-white border border-gray-200 divide-y divide-gray-100 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Street
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    City
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Zipcode
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Latitude
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Longitude
                  </th>
                  <th></th>
                  <th></th>
                  {/* <th>Active</th> */}
                </tr>
              </thead>

              <tbody>{insertLandfills()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandfillList;
