import {
  ShieldCheck,
  MapPin,
  Filter,
  Utensils,
  Star,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Filter,
    title: "Smart Allergen Filters",
    description:
      "Select your specific allergens and dietary restrictions. We'll only show restaurants that can accommodate you.",
  },
  {
    icon: MapPin,
    title: "Location-Based Search",
    description:
      "Find allergy-safe restaurants near you with our interactive map. See exactly how far each option is.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Information",
    description:
      "Every restaurant is verified for allergen protocols. Know exactly what's safe before you arrive.",
  },
  {
    icon: Utensils,
    title: "Detailed Menu Info",
    description:
      "See which menu items match your dietary needs. No more guessing or awkward conversations.",
  },
  {
    icon: Star,
    title: "Community Reviews",
    description:
      "Read reviews from others with similar allergies. Real experiences from real people.",
  },
  {
    icon: Bell,
    title: "New Restaurant Alerts",
    description:
      "Get notified when new allergy-friendly restaurants open in your area.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary">
            Features
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Everything You Need to Dine Safely
          </h2>
          <p className="text-lg text-muted-foreground">
            SafeBite takes the stress out of finding safe restaurants, so you
            can focus on enjoying your meal.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary">
                <feature.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;