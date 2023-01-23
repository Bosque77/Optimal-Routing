import React, { useState } from "react";
import { LatLng, Address, HttpResponse } from "../types";
import geocode from "../services/geocode";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";

interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
  }

const CreateLandfillForm = ({ setActive }: prop) => {

    const dispatch = useDispatch();
    const { setAlert, createLandfill } = bindActionCreators(
      actionCreators,
      dispatch
    );

    const region = useSelector((state: State) => state.setRegion);


    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");



    return (
        <div>
        <h1>Create Landfill Form</h1>
        </div>
    );
    };


    export default CreateLandfillForm;