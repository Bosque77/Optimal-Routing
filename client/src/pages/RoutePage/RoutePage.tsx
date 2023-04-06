import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import GoogleMapWithMarkers from "../../components/GoogleMapWithMarkers";

const RoutePage = () => {
  const markers = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.73061, lng: -73.935242 },
    { lat: 40.706086, lng: -74.009051 },
  ];

  return (
    <div className="bg-slate-100 flex h-full">
      <Alert />
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapWithMarkers
          centerLatitude={40.7128}
          centerLongitude={-74.006}
          markers={markers}
        />
      </div>
    </div>
  );
};

export default RoutePage;
