// src/components/GoogleMapWithMarkers.tsx

import React, { useEffect, useRef } from 'react';

interface GoogleMapWithMarkersProps {
  centerLatitude: number;
  centerLongitude: number;
  markers: Array<{ lat: number; lng: number, type:string }>;
}

const getMarkerIconUrl = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    'order': 'red',
    'landfill': 'blue',
    'depot': 'green',
  };

  const color = colorMap[type] || 'gray';
  return `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
};

const GoogleMapWithMarkers: React.FC<GoogleMapWithMarkersProps> = ({
  centerLatitude,
  centerLongitude,
  markers,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || typeof google === 'undefined') return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: centerLatitude, lng: centerLongitude },
        zoom: 12,
      });

      markers.forEach((marker) => {
        new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          icon: getMarkerIconUrl(marker.type),
          map,
        });
      });
    };

    initMap();
  }, [centerLatitude, centerLongitude, markers]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default GoogleMapWithMarkers;
