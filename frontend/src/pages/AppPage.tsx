import { useState, useMemo, useEffect } from "react";
import AppHeader from "@/components/app/AppHeader";
import FiltersPanel from "@/components/app/FiltersPanel";
import RestaurantList from "@/components/app/RestaurantList";
import MapView from "@/components/app/MapView";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Map, List, X, Loader2 } from "lucide-react";
import { useRestaurants } from "@/lib/queries";
import { transformRestaurants, type AllergenKey } from "@/types";

const AppPage = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<AllergenKey[]>([]);
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [showPicks, setShowPicks] = useState(true);
  const [showPossibles, setShowPossibles] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // User location state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user's geolocation on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      // Fallback to Nashville, TN
      setUserLocation({ lat: 36.158, lng: -86.78 });
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
        console.error("Geolocation error:", error);
        setLocationError("Unable to get your location. Using default location.");
        // Fallback to Nashville, TN
        setUserLocation({ lat: 36.158, lng: -86.78 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }, []);

  // Convert miles to meters for API (1 mile = 1609.34 meters)
  const radiusInMeters = Math.min(selectedDistance * 1609, 5000); // API max is 5000m

  // Fetch restaurants from API
  const {
    data: apiRestaurants,
    isLoading,
    isError,
  } = useRestaurants(
    {
      lat: userLocation?.lat ?? 0,
      lon: userLocation?.lng ?? 0,
      radius: radiusInMeters,
    },
    !!userLocation // Only fetch when we have a location
  );

  // Transform and filter restaurants
  const filteredRestaurants = useMemo(() => {
    if (!apiRestaurants || !userLocation) return [];

    // Transform API data to frontend format
    const transformed = transformRestaurants(
      apiRestaurants,
      userLocation.lat,
      userLocation.lng,
      selectedAllergens
    );

    // Apply frontend filters
    return transformed
      .filter((restaurant) => {
        // Distance filter (already filtered by API, but double-check)
        if (restaurant.distance > selectedDistance) return false;

        // Rating filter
        if (restaurant.rating === "pick" && !showPicks) return false;
        if (restaurant.rating === "possible" && !showPossibles) return false;

        return true;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [apiRestaurants, userLocation, selectedAllergens, selectedDistance, showPicks, showPossibles]);

  // Loading state
  if (!userLocation) {
    return (
      <div className="flex h-screen flex-col bg-background">
        <AppHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">
              Getting your location...
            </p>
            {locationError && (
              <p className="mt-2 text-sm text-destructive">{locationError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Filters Panel - Desktop */}
        <div className="hidden w-72 flex-shrink-0 lg:block">
          <FiltersPanel
            selectedAllergens={selectedAllergens}
            setSelectedAllergens={setSelectedAllergens}
            selectedDistance={selectedDistance}
            setSelectedDistance={setSelectedDistance}
            showPicks={showPicks}
            setShowPicks={setShowPicks}
            showPossibles={showPossibles}
            setShowPossibles={setShowPossibles}
          />
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/50"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 top-16 overflow-y-auto bg-card">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="font-display text-lg font-semibold">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <FiltersPanel
                selectedAllergens={selectedAllergens}
                setSelectedAllergens={setSelectedAllergens}
                selectedDistance={selectedDistance}
                setSelectedDistance={setSelectedDistance}
                showPicks={showPicks}
                setShowPicks={setShowPicks}
                showPossibles={showPossibles}
                setShowPossibles={setShowPossibles}
              />
            </div>
          </div>
        )}

        {/* Restaurant List - Desktop */}
        <div className="hidden w-[420px] flex-shrink-0 lg:block">
          <RestaurantList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        {/* Map - Desktop */}
        <div className="hidden flex-1 lg:block">
          <MapView
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            userLocation={userLocation}
          />
        </div>

        {/* Mobile View */}
        <div className="flex flex-1 flex-col lg:hidden">
          {/* Mobile Toggle & Filter Button */}
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilters(true)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {selectedAllergens.length > 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {selectedAllergens.length}
                </span>
              )}
            </Button>

            <div className="flex rounded-lg border border-border">
              <button
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors ${
                  mobileView === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileView("list")}
              >
                <List className="h-4 w-4" />
                List
              </button>
              <button
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors ${
                  mobileView === "map"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileView("map")}
              >
                <Map className="h-4 w-4" />
                Map
              </button>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-hidden">
            {mobileView === "list" ? (
              <RestaurantList
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                setSelectedRestaurant={setSelectedRestaurant}
                isLoading={isLoading}
                isError={isError}
              />
            ) : (
              <MapView
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                setSelectedRestaurant={setSelectedRestaurant}
                userLocation={userLocation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
