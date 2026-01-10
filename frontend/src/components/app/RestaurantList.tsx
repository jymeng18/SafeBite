import type { Restaurant } from "@/types";
import RestaurantCard from "./RestaurantCard";
import { Loader2 } from "lucide-react";

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurant: string | null;
  setSelectedRestaurant: (id: string | null) => void;
  isLoading?: boolean;
  isError?: boolean;
}

const RestaurantList = ({
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant,
  isLoading = false,
  isError = false,
}: RestaurantListProps) => {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-secondary/30">
      <div className="border-b border-border bg-card px-6 py-4">
        <h2 className="font-display text-lg font-semibold text-foreground">
          {isLoading ? "Searching..." : `${restaurants.length} restaurants found`}
        </h2>
        <p className="text-sm text-muted-foreground">
          Sorted by distance from your location
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">
              Finding restaurants near you...
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">😕</div>
            <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
              Something went wrong
            </h3>
            <p className="text-muted-foreground">
              Unable to load restaurants. Please try again later.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isSelected={selectedRestaurant === restaurant.id}
                  onSelect={() =>
                    setSelectedRestaurant(
                      selectedRestaurant === restaurant.id ? null : restaurant.id
                    )
                  }
                />
              ))}
            </div>

            {restaurants.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 text-6xl">🍽️</div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                  No restaurants found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or expanding your search radius.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
