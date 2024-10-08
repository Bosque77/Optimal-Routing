/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { useSelector } from "react-redux";
import DepotList from "../../components/DepotList";

import GoogleMap from "../../components/GoogleMap";
import { State } from "../../state";

const DepotPage = () => {
  const depots = useSelector((state: State) => state.depots);

  return (
    <div>
      <GoogleMap depots={depots} />
      <DepotList />
    </div>
  );
};

export default DepotPage;
