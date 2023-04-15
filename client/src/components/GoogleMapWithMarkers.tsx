// src/components/GoogleMapWithMarkers.tsx

import React, { useContext, useEffect, useRef } from "react";
import {
  SelectedRouteItemsContext,
  SelectedRouteItemsContextType,
} from "./SelectedRouteItemsContext";
import { useSelector } from "react-redux";
import { State } from "../state";
import { Depot, Landfill, Order } from "../types";

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

const GoogleMapWithMarkers: React.FC<GoogleMapWithMarkersProps> = ({
  centerLatitude,
  centerLongitude,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
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

  const getMarkers = () => {
    const markers = [
      ...[...selectedDepotIds].map((depotId) => {
        const depot = depots.find((d) => d.id === depotId) as Depot; // Find the depot by ID

        return {
          lat: depot.latitude,
          lng: depot.longitude,
          type: "depot",
          title: `Depot: ${depot.name}, ${depot.street} , ${depot.city}, ${depot.state}, ${depot.zipcode}`,
        };
      }),
      ...[...selectedLandfillIds].map((landfillId) => {
        const landfill = landfills.find((l) => l.id === landfillId) as Landfill; // Find the landfill by ID

        return {
          lat: landfill.latitude,
          lng: landfill.longitude,
          type: "landfill",
          title: `Landfill: ${landfill.name}, ${landfill.street} , ${landfill.city}, ${landfill.state}, ${landfill.zipcode}`,
        };
      }),
      ...[...selectedOrderIds].map((orderId) => {
        const order = orders.find((o) => o.id === orderId) as Order; // Find the order by ID

        return {
          lat: order.latitude,
          lng: order.longitude,
          type: "order",
          title: `Order: ${order.name},  ${order.street}, ${order.city}, ${order.state}, ${order.zipcode}`,
        };
      }),
    ];

    return markers;
  };

  const markers = getMarkers();

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || typeof google === "undefined") return;

      const gMap = new google.maps.Map(mapRef.current, {
        // Renamed map to gMap
        center: { lat: centerLatitude, lng: centerLongitude },
        zoom: 12,
      });

      markers.forEach((marker) => {
        new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          icon: getMarkerIconUrl(marker.type),
          title: marker.title, // Use the title from the marker object
          map: gMap, // Use gMap instead of map
        });
      });
    };

    initMap();
  }, [centerLatitude, centerLongitude, markers]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};

export default GoogleMapWithMarkers;
