import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/leaflet-icons";

const Map = () => {
  const position: [number, number] = [-34.6037, -58.3816];

  return (
    <section className="bg-muted">
        <div className="bg-white p-6 rounded-xl border-none">
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          <div className="rounded-xl overflow-hidden h-[400px] relative">
            <div className="absolute inset-0 z-0">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={position}>
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-semibold">DO!T Headquarters</h3>
                      <p>123 Service Avenue, Tech City</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Map;