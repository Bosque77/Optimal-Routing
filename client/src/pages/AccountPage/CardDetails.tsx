import React, { FunctionComponent, useEffect, useState } from "react";
import visa_icon from "../../assets/visa_icon.png";
import mastercard_icon from "../../assets/mastercard_icon.png";
import Modal from "react-modal";
import AddCardPayment from "./AddCardPayment";
import Alert from "../../components/Alert";
import useCardDetails from "components/hooks/useCardDetails";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "state";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // black with 50% opacity
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white", // fully opaque white
    width: 400,
  },
};

const sample_card_details = [
  {
    id: 1,
    title: "Visa",
    last_4_digits: "1234",
    active: true,
  },
  {
    id: 2,
    title: "Mastercard",
    last_4_digits: "3278",
    active: false,
  },
];

export const CardDetails: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { showAlert } = bindActionCreators(actionCreators, dispatch);

  const [modalOpen, setModalOpen] = useState(false);
  const { cardDetails, loading, error } = useCardDetails();

  useEffect(() => {
    if (error) {
      showAlert("Error connecting to server", "error");
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  console.log("logging the card details");
  console.log(cardDetails);

  Modal.setAppElement("#root");

  const handleCardSelect = (id: number) => {
    console.log("in the process of updating");
    // const updatedCardDetails = cardDetails.map((card) => {
    //   if (card.id === id) {
    //     return { ...card, active: true };
    //   }
    //   return { ...card, active: false };
    // });

    // setCardDetails(updatedCardDetails);
  };

  const insertCardDetailsMsg = () => {
    if (loading) return <div className="text-gray-500">Loading...</div>;
    if (error)
      return (
        <div className="text-gray-500">Error loading card details</div>
      );
    if (cardDetails.length === 0)
      return <div className="text-gray-500 text-xs">Add payment to try out features!</div>;
  };

  const insertCardDetails = () => {
    return <div></div>;

    // This code will display the card details of the user but is WIP
    // return card_details.map((card: any) => {
    //   let card_icon;

    //   switch (card.title) {
    //     case "Visa":
    //       card_icon = visa_icon;
    //       break;
    //     case "Mastercard":
    //       card_icon = mastercard_icon;
    //       break;
    //     default:
    //       card_icon = visa_icon;
    //       break;
    //   }

    //   return (
    //     <div
    //       key={card.id}
    //       className={
    //         card.active
    //           ? `flex flex-col items-start px-6 py-4 bg-gray-200 my-4 mx-4 rounded`
    //           : `flex flex-col items-start px-6 py-4 bg-gray-50 my-4 mx-4 rounded`
    //       }
    //     >
    //       <div className="flex flex-row items-center w-full">
    //         <div className="flex justify-start items-center">
    //           <img src={card_icon} className="w-8 h-8 mr-2" alt="Card Icon" />
    //           <p className="font-semibold">{card.title}</p>
    //         </div>
    //         <p className="flex justify-start font-semibold ml-4">
    //           **** **** **** {card.last_4_digits}
    //         </p>
    //         <input
    //           type="radio"
    //           name="cardSelection"
    //           className=" ml-auto cursor-pointer"
    //           checked={card.active}
    //           onChange={() => handleCardSelect(card.id)}
    //         />
    //       </div>
    //       <button className="text-sm text-gray-500 block mt-2 hover:text-gray-900 hover:scale-105 active:scale-95">
    //         Edit
    //       </button>
    //     </div>
    //   );
    // });
  };

  return (
    <>
      <div className="border bg-white rounded-lg">
        <div className="flex flex-row px-6 py-4">
          <div className="flex flex-col text-left">
            <div className="text-lg font-semibold">Card Details</div>
            {insertCardDetailsMsg() }
          </div>
          <button
            className="ml-auto px-4 py-2 border rounded-lg text-blue-600 active:scale-95 hover:bg-gray-200"
            onClick={() => setModalOpen(true)}
          >
            Add Payment
          </button>
        </div>
        {/* <hr className="border-gray-200 my-4 border-t-2" /> */}
        {cardDetails && <div id="cards">{insertCardDetails()}</div>}
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <AddCardPayment />
      </Modal>
    </>
  );
};
