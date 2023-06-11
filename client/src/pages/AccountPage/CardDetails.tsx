import React, { FunctionComponent } from 'react';

interface CardProps {
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export const CardDetails: FunctionComponent<CardProps> = ({ title, subtitle, image, description }) => {
  return (
    <div className=" bg-white rounded-xl shadow-md ">

    </div>
  );
};
