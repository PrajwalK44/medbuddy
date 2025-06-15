import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Button } from "./ui/button";
import { Search, Navigation } from "lucide-react";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  distance: number;
  rating?: number;
  openNow?: boolean;
  phoneNumber?: string;
  openingHours?: string[];
  priceLevel?: number;
  photos?: string[];
}

interface NearbyPharmaciesProps {
  userLocation?: {
    lat: number;
    lng: number;
  };
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

const NearbyPharmacies: React.FC<NearbyPharmaciesProps> = ({
  userLocation,
  onLocationUpdate,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  const defaultCenter = {
    lat: 19.076, // Mumbai coordinates
    lng: 72.8777,
  };

  const center = userLocation || defaultCenter;

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
    setPlacesService(new google.maps.places.PlacesService(map));
  };

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const searchNearbyPharmacies = async () => {
    if (!placesService || !userLocation) {
      setError("Map not ready or location not available");
      return;
    }

    setLoading(true);
    setError(null);

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(userLocation.lat, userLocation.lng),
      radius: 5000, // 5km radius
      type: "pharmacy",
      keyword: "pharmacy medical store chemist",
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const pharmacyData: Pharmacy[] = results.map((place) => {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            place.geometry?.location?.lat() || 0,
            place.geometry?.location?.lng() || 0
          );

          return {
            id: place.place_id || Math.random().toString(),
            name: place.name || "Unknown Pharmacy",
            address: place.vicinity || "Address not available",
            location: {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            },
            distance: parseFloat(distance.toFixed(2)),
            rating: place.rating,
            openNow: place.opening_hours?.open_now,
            priceLevel: place.price_level,
          };
        });

        // Sort by distance
        pharmacyData.sort((a, b) => a.distance - b.distance);
        setPharmacies(pharmacyData);
        setLoading(false);
      } else {
        setError("No pharmacies found nearby or API error occurred");
        setLoading(false);
      }
    });
  };

  const getPharmacyDetails = (placeId: string, pharmacy: Pharmacy) => {
    if (!placesService) return;

    const request = {
      placeId: placeId,
      fields: [
        "name",
        "formatted_phone_number",
        "opening_hours",
        "photos",
        "website",
        "url",
      ],
    };

    placesService.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const updatedPharmacy = {
          ...pharmacy,
          phoneNumber: place.formatted_phone_number,
          openingHours: place.opening_hours?.weekday_text,
          photos: place.photos?.map((photo) => photo.getUrl({ maxWidth: 400 })),
        };
        setSelectedPharmacy(updatedPharmacy);
      }
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Update the userLocation state in the parent component
        if (onLocationUpdate) {
          onLocationUpdate(newLocation);
        }

        if (map) {
          map.panTo(newLocation);
          map.setZoom(15);
        }

        // Trigger search with new location
        setTimeout(() => searchNearbyPharmacies(), 1000);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Please enable location access in your browser settings");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred while getting your location");
        }
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const openDirections = (pharmacy: Pharmacy) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.location.lat},${pharmacy.location.lng}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (userLocation && placesService) {
      searchNearbyPharmacies();
    }
  }, [userLocation, placesService]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Nearby Medical Stores
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            Use My Location
          </Button>
          <Button
            onClick={searchNearbyPharmacies}
            disabled={loading || !userLocation}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            {loading ? "Searching..." : "Search Nearby"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]} // Important: Include places library
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={onMapLoad}
          options={{
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}

          {pharmacies.map((pharmacy) => (
            <Marker
              key={pharmacy.id}
              position={pharmacy.location}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              onClick={() => {
                setSelectedPharmacy(pharmacy);
                getPharmacyDetails(pharmacy.id, pharmacy);
              }}
            />
          ))}

          {selectedPharmacy && (
            <InfoWindow
              position={selectedPharmacy.location}
              onCloseClick={() => setSelectedPharmacy(null)}
            >
              <div className="p-3 max-w-sm">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedPharmacy.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  📍 {selectedPharmacy.address}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  📏 {selectedPharmacy.distance} km away
                </p>
                {selectedPharmacy.rating && (
                  <p className="text-sm text-gray-600 mb-1">
                    ⭐ {selectedPharmacy.rating} rating
                  </p>
                )}
                <p className="text-sm mb-2">
                  <span
                    className={`font-medium ${
                      selectedPharmacy.openNow
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedPharmacy.openNow ? "🟢 Open Now" : "🔴 Closed"}
                  </span>
                </p>
                {selectedPharmacy.phoneNumber && (
                  <p className="text-sm text-gray-600 mb-2">
                    📞 {selectedPharmacy.phoneNumber}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => openDirections(selectedPharmacy)}
                    className="text-xs"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {loading && (
        <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Loading nearby pharmacies...
          </div>
        </div>
      )}

      {pharmacies.length > 0 && !loading && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Found {pharmacies.length} nearby pharmacies
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pharmacies.slice(0, 5).map((pharmacy) => (
              <div
                key={pharmacy.id}
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  setSelectedPharmacy(pharmacy);
                  map?.panTo(pharmacy.location);
                  map?.setZoom(16);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {pharmacy.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {pharmacy.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      {pharmacy.distance} km •{" "}
                      {pharmacy.rating ? `${pharmacy.rating} ⭐` : "No rating"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      pharmacy.openNow
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pharmacy.openNow ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyPharmacies;
