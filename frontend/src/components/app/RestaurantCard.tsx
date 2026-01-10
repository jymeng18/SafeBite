import type { Restaurant } from "@/data/restaurants";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onSelect: () => void;
}

const RestaurantCard = ({
  restaurant,
  isSelected,
  onSelect,
}: RestaurantCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`cursor-pointer rounded-xl border-2 bg-card p-5 transition-all duration-200 hover:shadow-md ${
        isSelected
          ? restaurant.rating === "pick"
            ? "border-pick shadow-lg"
            : "border-possible shadow-lg"
          : "border-border hover:border-muted-foreground"
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          {restaurant.rating === "pick" && (
            <span className="mb-1 inline-block text-xs font-medium text-muted-foreground">
              Featured
            </span>
          )}
          <h3 className="font-display text-lg font-bold text-foreground">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {restaurant.cuisine} • {restaurant.distance} miles
          </p>
        </div>
        <span
          className={`rounded-md px-3 py-1 text-xs font-semibold text-primary-foreground ${
            restaurant.rating === "pick" ? "bg-pick" : "bg-possible"
          }`}
        >
          {restaurant.rating === "pick" ? "Pick" : "Possible"}
        </span>
      </div>

      {/* Tags */}
      <div className="mb-3 space-y-1.5">
        {restaurant.isPartnered && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Check className="h-4 w-4" />
            <span>Partnered with SafeBite</span>
          </div>
        )}
        {restaurant.hasAllergyExcellence && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Check className="h-4 w-4" />
            <span>Allergy Excellence</span>
          </div>
        )}
        {restaurant.matchingItems > 0 && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Check className="h-4 w-4" />
            <span>
              Menu items that match your dietary settings:{" "}
              {restaurant.matchingItems}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className={`text-sm text-muted-foreground ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {restaurant.description}
      </p>

      {/* Expand/Collapse */}
      <button
        className="mt-2 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        {expanded ? (
          <>
            Show less <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            Read more <ChevronDown className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default RestaurantCard;
