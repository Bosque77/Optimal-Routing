import React, { FunctionComponent, useState } from "react";
import visa_icon from "../../assets/visa_icon.png";
import mastercard_icon from "../../assets/mastercard_icon.png";
import Modal from "react-modal";
import AddCardPayment from "./AddCardPayment";
const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",  // black with 50% opacity
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",  // fully opaque white
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
  const [modalOpen, setModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState(sample_card_details);

  Modal.setAppElement('#root');

  const handleCardSelect = (id: number) => {
    const updatedCardDetails = cardDetails.map((card) => {
      if (card.id === id) {
        return { ...card, active: true };
      }
      return { ...card, active: false };
    });

    setCardDetails(updatedCardDetails);
  };

  const insertCardDetails = (card_details: any) => {
    return card_details.map((card: any) => {
      let card_icon;

      switch (card.title) {
        case "Visa":
          card_icon = visa_icon;
          break;
        case "Mastercard":
          card_icon = mastercard_icon;
          break;
        default:
          card_icon = visa_icon;
          break;
      }

      return (
        <div
          key={card.id}
          className={
            card.active
              ? `flex flex-col items-start px-6 py-4 bg-gray-200 my-4 mx-4 rounded`
              : `flex flex-col items-start px-6 py-4 bg-gray-50 my-4 mx-4 rounded`
          }
        >
          <div className="flex flex-row items-center w-full">
            <div className="flex justify-start items-center">
              <img src={card_icon} className="w-8 h-8 mr-2" alt="Card Icon" />
              <p className="font-semibold">{card.title}</p>
            </div>
            <p className="flex justify-start font-semibold ml-4">
              **** **** **** {card.last_4_digits}
            </p>
            <input
              type="radio"
              name="cardSelection"
              className=" ml-auto cursor-pointer"
              checked={card.active}
              onChange={() => handleCardSelect(card.id)}
            />
          </div>
          <button className="text-sm text-gray-500 block mt-2 hover:text-gray-900 hover:scale-105 active:scale-95">
            Edit
          </button>
        </div>
      );
    });
  };

  return (
    <>
      <div className=" border bg-white rounded-lg ">
        <div className="flex flex-row items-center px-6 py-4">
          <h1 className="flex justify-start font-semibold grow">
            Card Details
          </h1>
          <button className="px-4 py-2 border rounded-lg text-blue-600 active:scale-95 hover:bg-gray-200"
          onClick={() => setModalOpen(true)}
          >
            Add Payment
          </button>
        </div>
        <hr className="border-gray-200 my-4 border-t-2" />
        <div id="cards">{insertCardDetails(cardDetails)}</div>
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
