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
    if (cardDetails && cardDetails.length > 0) {
      return cardDetails.map((cardDetail:any, index:any) => (
        <div key={index} className="flex items-center mt-4 space-x-4">
          <img
            src={cardDetail.card.brand === 'visa' ? visa_icon : mastercard_icon}
            alt={cardDetail.card.brand}
            className="w-12 h-12"
          />
          <div>Last 4 Digits: {cardDetail.card.last4}</div>
          <div className="flex grow">Expiration: {`${cardDetail.card.exp_month}/${cardDetail.card.exp_year}`}</div>
          <button className="ml-auto px-4 py-2 border rounded-lg text-gray-600 active:scale-95 hover:bg-gray-200">Select</button>
          </div>
      ));
    }
    return null;
  };
  
  
  return (
    <>
      <div className="border bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Card Details</div>
          <button
            className="ml-auto px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={() => setModalOpen(true)}
          >
            Add Payment
          </button>
        </div>
        {insertCardDetails()}
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
