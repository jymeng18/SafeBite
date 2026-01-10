import { useEffect } from "react";
import type { Restaurant } from "@/types";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-expect-error - Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const pickIcon = createCustomIcon("hsl(142, 72%, 45%)");
const possibleIcon = createCustomIcon("hsl(217, 91%, 60%)");

// User location icon
const userIcon = L.divIcon({
  className: "user-marker",
  html: `
    <div style="position: relative;">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background-color: hsl(142, 72%, 45%, 0.3);
        border-radius: 50%;
        animation: pulse 2s ease-out infinite;
      "></div>
      <div style="
        position: relative;
        width: 20px;
        height: 20px;
        background-color: hsl(142, 72%, 45%);
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: string | null;
  setSelectedRestaurant: (id: string | null) => void;
  userLocation?: { lat: number; lng: number };
}

// Component to handle map interactions
const MapController = ({
  selectedRestaurant,
  restaurants,
  userLocation,
}: {
  selectedRestaurant: string | null;
  restaurants: Restaurant[];
  userLocation?: { lat: number; lng: number };
}) => {
  const map = useMap();

  useEffect(() => {
    if (selectedRestaurant) {
      const restaurant = restaurants.find((r) => r.id === selectedRestaurant);
      if (restaurant) {
        map.flyTo([restaurant.lat, restaurant.lng], 16, { duration: 0.5 });
      }
    }
  }, [selectedRestaurant, restaurants, map]);

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 14);
    }
  }, [userLocation, map]);

  return null;
};

const MapView = ({
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant,
  userLocation,
}: MapViewProps) => {
  // Default center (Nashville, TN) - will be overridden by user location
  const defaultCenter: [number, number] = [
    userLocation?.lat ?? 36.158,
    userLocation?.lng ?? -86.78,
  ];

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={14}
        className="h-full w-full z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          selectedRestaurant={selectedRestaurant}
          restaurants={restaurants}
          userLocation={userLocation}
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Restaurant Markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.lat, restaurant.lng]}
            icon={restaurant.rating === "pick" ? pickIcon : possibleIcon}
            eventHandlers={{
              click: () => {
                setSelectedRestaurant(
                  selectedRestaurant === restaurant.id ? null : restaurant.id
                );
              },
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h4 className="font-semibold text-foreground">
                  {restaurant.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {restaurant.cuisine}
                </p>
                <p className="text-sm font-medium text-primary mt-1">
                  {restaurant.distance} miles away
                </p>
                {restaurant.matchingItems > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {restaurant.matchingItems} matching menu items
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
