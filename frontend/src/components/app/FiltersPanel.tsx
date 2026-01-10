import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { allergens, distances, type AllergenKey } from "@/types";
import { Check, X, Lock } from "lucide-react";

interface FiltersPanelProps {
  selectedAllergens: AllergenKey[];
  setSelectedAllergens: (allergens: AllergenKey[]) => void;
  selectedDistance: number;
  setSelectedDistance: (distance: number) => void;
  showPicks: boolean;
  setShowPicks: (show: boolean) => void;
  showPossibles: boolean;
  setShowPossibles: (show: boolean) => void;
}

const FiltersPanel = ({
  selectedAllergens,
  setSelectedAllergens,
  selectedDistance,
  setSelectedDistance,
  showPicks,
  setShowPicks,
  showPossibles,
  setShowPossibles,
}: FiltersPanelProps) => {
  const toggleAllergen = (allergenId: AllergenKey) => {
    if (selectedAllergens.includes(allergenId)) {
      setSelectedAllergens(selectedAllergens.filter((id) => id !== allergenId));
    } else {
      setSelectedAllergens([...selectedAllergens, allergenId]);
    }
  };

  return (
    <aside className="h-full overflow-y-auto border-r border-border bg-card p-6">
      <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
        Filters
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Restaurants we recommend for your dietary settings.
      </p>

      {/* Rating Filters */}
      <div className="mb-6 space-y-3">
        <div
          className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors ${
            showPicks ? "border-pick bg-pick/10" : "border-border"
          }`}
          onClick={() => setShowPicks(!showPicks)}
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
              showPicks ? "border-pick bg-pick" : "border-muted-foreground"
            }`}
          >
            {showPicks && <Check className="h-3 w-3 text-primary-foreground" />}
          </div>
          <div>
            <span className="rounded-md bg-pick px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              Picks
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              Our top picks for you!
            </p>
          </div>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors ${
            showPossibles ? "border-possible bg-possible/10" : "border-border"
          }`}
          onClick={() => setShowPossibles(!showPossibles)}
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
              showPossibles
                ? "border-possible bg-possible"
                : "border-muted-foreground"
            }`}
          >
            {showPossibles && (
              <Check className="h-3 w-3 text-primary-foreground" />
            )}
          </div>
          <div>
            <span className="rounded-md bg-possible px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              Possibles
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              May work for you!
            </p>
          </div>
        </div>
      </div>

      {/* Distance */}
      <div className="mb-6">
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          Distance
        </h3>
        <RadioGroup
          value={selectedDistance.toString()}
          onValueChange={(val) => setSelectedDistance(parseInt(val))}
          className="space-y-2"
        >
          {distances.map((distance) => (
            <div key={distance.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={distance.value.toString()}
                id={`distance-${distance.value}`}
                className="border-muted-foreground text-primary"
              />
              <Label
                htmlFor={`distance-${distance.value}`}
                className="cursor-pointer text-sm text-foreground"
              >
                {distance.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Allergens */}
      <div className="mb-6">
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          My Allergens
        </h3>
        <div className="space-y-2">
          {allergens.map((allergen) => (
            <div
              key={allergen.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2 transition-all ${
                selectedAllergens.includes(allergen.id)
                  ? "border-destructive bg-destructive/10"
                  : "border-border hover:border-muted-foreground"
              }`}
              onClick={() => toggleAllergen(allergen.id)}
            >
              <span className="text-lg">{allergen.icon}</span>
              <span className="flex-1 text-sm text-foreground">
                {allergen.label}
              </span>
              {selectedAllergens.includes(allergen.id) && (
                <X className="h-4 w-4 text-destructive" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-border bg-secondary/50 p-4">
        <p className="mb-3 text-center text-sm font-medium text-foreground">
          Create a FREE account to unlock all filters!
        </p>
        <Button variant="safe" className="w-full">
          Create FREE account
        </Button>
      </div>

      {/* Locked Filters Preview */}
      <div className="mt-6 opacity-60">
        <div className="mb-3 flex items-center gap-2">
          <h3 className="font-display text-sm font-semibold text-foreground">
            Experience is
          </h3>
          <Lock className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>☐ Full Service</p>
          <p>☐ Fast Casual</p>
          <p>☐ Fast Food</p>
        </div>
      </div>
    </aside>
  );
};

export default FiltersPanel;
