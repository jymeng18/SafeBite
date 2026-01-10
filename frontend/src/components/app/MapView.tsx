import type { Restaurant } from "@/data/restaurants";
import { MapPin, ZoomIn, ZoomOut, Locate, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: string | null;
  setSelectedRestaurant: (id: string | null) => void;
}

const MapView = ({
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant,
}: MapViewProps) => {
  // Mock map - in production, integrate with Mapbox or Google Maps
  const centerLat = 36.158;
  const centerLng = -86.78;

  const getMarkerPosition = (restaurant: Restaurant) => {
    // Convert lat/lng to percentage position (simplified)
    const x = ((restaurant.lng - centerLng + 0.03) / 0.06) * 100;
    const y = ((centerLat - restaurant.lat + 0.02) / 0.04) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="relative h-full w-full bg-secondary">
      {/* Map Controls */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 bg-card shadow-md"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 bg-card shadow-md"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 bg-card shadow-md"
        >
          <Locate className="h-5 w-5" />
        </Button>
      </div>

      {/* Info Button */}
      <div className="absolute left-4 top-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 bg-card shadow-md"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-secondary to-accent/80">
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px w-full bg-muted-foreground/30"
              style={{ top: `${i * 10 + 5}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-muted-foreground/30"
              style={{ left: `${i * 10 + 5}%` }}
            />
          ))}
        </div>

        {/* Road-like lines */}
        <div className="absolute left-1/4 top-0 h-full w-1 bg-muted-foreground/20" />
        <div className="absolute right-1/3 top-0 h-full w-0.5 bg-muted-foreground/20" />
        <div className="absolute left-0 top-1/3 h-0.5 w-full bg-muted-foreground/20" />
        <div className="absolute left-0 top-2/3 h-1 w-full bg-muted-foreground/20" />
      </div>

      {/* User Location Marker */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%", top: "50%" }}
      >
        <div className="relative">
          <div className="absolute -inset-4 animate-ping rounded-full bg-primary/30" />
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-foreground bg-primary shadow-lg">
            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Restaurant Markers */}
      {restaurants.map((restaurant) => {
        const pos = getMarkerPosition(restaurant);
        const isSelected = selectedRestaurant === restaurant.id;

        return (
          <div
            key={restaurant.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:z-30 hover:scale-125"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() =>
              setSelectedRestaurant(isSelected ? null : restaurant.id)
            }
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-all ${
                restaurant.rating === "pick" ? "bg-pick" : "bg-possible"
              } ${isSelected ? "ring-4 ring-foreground/20 scale-125" : ""}`}
            >
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>

            {/* Tooltip on hover/select */}
            {isSelected && (
              <div className="absolute left-1/2 top-full z-40 mt-2 w-48 -translate-x-1/2 rounded-lg border border-border bg-card p-3 shadow-xl">
                <h4 className="font-display text-sm font-semibold text-foreground">
                  {restaurant.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {restaurant.cuisine}
                </p>
                <p className="mt-1 text-xs font-medium text-primary">
                  {restaurant.distance} miles away
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 z-10 rounded bg-card/80 px-2 py-1 text-xs text-muted-foreground">
        © SafeBite Maps
      </div>
    </div>
  );
};

export default MapView;
