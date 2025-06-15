import React, { useState, useEffect } from "react";
import NearbyPharmacies from "../components/NearbyPharmacies";

const NearbyPharmaciesPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location);
    setLocationError(null);
  };

  // Try to get location on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Please enable location access in your browser settings"
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out");
            break;
          default:
            setLocationError(
              "An unknown error occurred while getting your location"
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Find Nearby Pharmacies
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Locate the nearest pharmacies and medical stores in your area
        </p>
        {locationError && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {locationError}
          </div>
        )}
      </div>
      <NearbyPharmacies
        userLocation={userLocation}
        onLocationUpdate={handleLocationUpdate}
      />
    </div>
  );
};

export default NearbyPharmaciesPage;
