import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const bloodBankIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/2854/2854145.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/3448/3448513.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const LocationUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { animate: true, duration: 2 });
    }
  }, [position, map]);

  return null;
};

const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

// List of blood groups to randomly pick from
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// Generate dummy blood banks around a location
const generateDummyBloodBanks = (latitude, longitude) => {
  const dummyBloodBanks = [];

  for (let i = 1; i <= 5; i++) {
    const randomOffsetLat = (Math.random() - 0.5) / 100; // Small offset
    const randomOffsetLon = (Math.random() - 0.5) / 100;

    const randomAvailable = Array.from(
      { length: Math.floor(Math.random() * 4) + 1 }, // 1 to 4 blood groups
      () => bloodGroups[Math.floor(Math.random() * bloodGroups.length)]
    );

    dummyBloodBanks.push({
      id: i,
      name: `Blood Bank ${i}`,
      location: [latitude + randomOffsetLat, longitude + randomOffsetLon],
      available: randomAvailable,
    });
  }

  return dummyBloodBanks;
};

const BloodBankMap = ({ onLocationSelect }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const mapRef = useRef();

  const getCurrentLocationAndNearbyHospitals = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        console.log("User Location:", latitude, longitude);

        // Generate dummy blood banks near user
        const generatedBanks = generateDummyBloodBanks(latitude, longitude);
        setBloodBanks(generatedBanks);
        console.log("Generated Blood Banks:", generatedBanks);

        // Fetch nearby hospitals
        try {
          const response = await fetch(
            `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"](around:2000,${latitude},${longitude}););out;`
          );
          const data = await response.json();
          const hospitals = data.elements.map((el, index) => ({
            id: el.id || index,
            name: el.tags.name || "Unnamed Hospital",
            location: [el.lat, el.lon],
          }));
          setNearbyHospitals(hospitals);
          console.log("Nearby Hospitals:", hospitals);
        } catch (error) {
          console.error("Error fetching nearby hospitals:", error);
        }

        // Reverse Geocode user location to get address
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const addressData = await res.json();
          console.log("Your Address:", addressData.display_name);
          setUserAddress(addressData.display_name);
        } catch (err) {
          console.error("Error fetching address:", err);
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={getCurrentLocationAndNearbyHospitals}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Show My Location and Nearby Blood Banks
        </button>
      </div>

      <div style={{ height: "calc(100vh - 120px)", width: "100%" }}>
        <MapContainer
          center={[28.6139, 77.209]} // dummy center
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <b>You are here:</b><br /> {userAddress || "Locating..."}
              </Popup>
            </Marker>
          )}

          {bloodBanks.map((bank) => {
            const distance = userLocation
              ? getDistanceInKm(
                  userLocation[0],
                  userLocation[1],
                  bank.location[0],
                  bank.location[1]
                )
              : null;

            return (
              <Marker
                key={`bloodbank-${bank.id}`}
                position={bank.location}
                icon={bloodBankIcon}
                eventHandlers={{
                  click: () => {
                    if (onLocationSelect) {
                      onLocationSelect(bank);
                    }
                  },
                }}
              >
                <Popup>
                  <b>{bank.name}</b><br />
                  {distance ? `${distance} km away` : "Distance unknown"}
                  <br />
                  Available: {bank.available.join(", ")}
                </Popup>
              </Marker>
            );
          })}

          {nearbyHospitals.map((hospital) => (
            <Marker
              key={`hospital-${hospital.id}`}
              position={hospital.location}
              icon={hospitalIcon}
            >
              <Popup>{hospital.name}</Popup>
            </Marker>
          ))}

          <LocationUpdater position={userLocation} />
        </MapContainer>
      </div>
    </div>
  );
};

export default BloodBankMap;
