import { useState, useMemo } from "react";
import AppHeader from "@/components/app/AppHeader";
import FiltersPanel from "@/components/app/FiltersPanel";
import RestaurantList from "@/components/app/RestaurantList";
import MapView from "@/components/app/MapView";
import { mockRestaurants } from "@/data/restaurants";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Map, List, X } from "lucide-react";

const AppPage = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([
    "peanuts",
    "dairy",
  ]);
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [showPicks, setShowPicks] = useState(true);
  const [showPossibles, setShowPossibles] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // User location - default to Nashville, TN (will be replaced with real geolocation)
  const [userLocation] = useState({ lat: 36.158, lng: -86.78 });

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return mockRestaurants
      .filter((restaurant) => {
        // Distance filter
        if (restaurant.distance > selectedDistance) return false;

        // Rating filter
        if (restaurant.rating === "pick" && !showPicks) return false;
        if (restaurant.rating === "possible" && !showPossibles) return false;

        return true;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [selectedDistance, showPicks, showPossibles]);

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
