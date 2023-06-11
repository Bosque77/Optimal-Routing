import React, { FunctionComponent, useState } from 'react';

export const EditCardPayment: FunctionComponent = () => {
    const [cardInfo, setCardInfo] = useState({
      title: '',
      last_4_digits: '',
    });
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCardInfo({ ...cardInfo, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // TODO: Implement edit card payment logic
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Card Type (Visa, Mastercard, etc.)"
          value={cardInfo.title}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
        />
        <input
          name="last_4_digits"
          placeholder="Last 4 digits"
          value={cardInfo.last_4_digits}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mt-2"
        />
        <button type="submit" className="mt-2 px-4 py-2 border rounded-lg text-blue-600 active:scale-95 hover:bg-gray-200">
          Edit Card
        </button>
      </form>
    );
  };

export default EditCardPayment;