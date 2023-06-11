// src/components/GoogleMapWithMarkers.tsx

import React, { useContext, useEffect, useRef } from "react";
import {
  SelectedRouteItemsContext,
  SelectedRouteItemsContextType,
} from "./SelectedRouteItemsContext";
import { useSelector } from "react-redux";
import { State } from "../state";
import { Depot, Landfill, Order } from "../../../shared/types";

interface GoogleMapWithMarkersProps {
  centerLatitude: number;
  centerLongitude: number;
}

const getMarkerIconUrl = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    order: "red",
    landfill: "blue",
    depot: "green",
  };

  const color = colorMap[type] || "gray";
  return `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
};

const GoogleMapWithMarkers = ({
  centerLatitude,
  centerLongitude,
}: GoogleMapWithMarkersProps) => {


  const mapRef = useRef<HTMLDivElement | null>(null);
  const gMapRef = useRef<google.maps.Map | null>(null);
  const region = useSelector((state: State) => state.setRegion);
  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);

  const selectedDepotIds = useContext<SelectedRouteItemsContextType>(
    SelectedRouteItemsContext
  ).selectedDepots;
  const selectedLandfillIds = useContext<SelectedRouteItemsContextType>(
    SelectedRouteItemsContext
  ).selectedLandfills;
  const selectedOrderIds = useContext<SelectedRouteItemsContextType>(
    SelectedRouteItemsContext
  ).selectedOrders;

  const markersRef = useRef<google.maps.Marker[]>([]); // <-- NEW: store markers


  const getMarkers = () => {
    const markers = [
      ...[...selectedDepotIds].map((depotId) => {
        const depot = depots.find((d) => d.id === depotId) as Depot; // Find the depot by ID
        if (depot) {
          return {
            lat: depot.latitude,
            lng: depot.longitude,
            type: "depot",
            title: `Depot: ${depot.name}, ${depot.street} , ${depot.city}, ${depot.state}, ${depot.zipcode}`,
          };
        }
      }),
      ...[...selectedLandfillIds].map((landfillId) => {
        const landfill = landfills.find((l) => l.id === landfillId) as Landfill; // Find the landfill by ID
        if (landfill) {
          return {
            lat: landfill.latitude,
            lng: landfill.longitude,
            type: "landfill",
            title: `Landfill: ${landfill.name}, ${landfill.street} , ${landfill.city}, ${landfill.state}, ${landfill.zipcode}`,
          };
        }
      }),
      ...[...selectedOrderIds].map((orderId) => {
        const order = orders.find((o) => o.id === orderId) as Order; // Find the order by ID
        if (order) {
          return {
            lat: order.latitude,
            lng: order.longitude,
            type: "order",
            title: `Order: ${order.name},  ${order.street}, ${order.city}, ${order.state}, ${order.zipcode}`,
          };
        }
      }),
    ];

    return markers;
  };

  const markers = getMarkers();

 

  useEffect(() => {
    if (!mapRef.current || typeof google === "undefined") return;

    gMapRef.current = new google.maps.Map(mapRef.current, {
      center: { lat: centerLatitude, lng: centerLongitude },
      zoom: 12,
    });
  }, []); // empty dependency array

  useEffect(() => {
    if (!gMapRef.current) return;

       // Remove existing markers
       markersRef.current.forEach(marker => marker.setMap(null));
       markersRef.current = []; // Clear out the ref

   

    // Add new markers
    markers.forEach((marker) => {
      if(marker){
        const gMarker = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          icon: getMarkerIconUrl(marker.type),
          title: marker.title, 
          map: gMapRef.current, 
        });

        markersRef.current.push(gMarker); // Save marker to ref
      }
    });
  }, [markers]); // dependency on markers

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};

export default GoogleMapWithMarkers;
