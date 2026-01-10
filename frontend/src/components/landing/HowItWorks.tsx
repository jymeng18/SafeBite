import {
  UserPlus,
  SlidersHorizontal,
  MapPinCheck,
  Utensils,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description:
      "Sign up and enter your allergens and dietary restrictions. Your preferences are saved for easy access.",
  },
  {
    icon: SlidersHorizontal,
    step: "02",
    title: "Set Your Filters",
    description:
      "Choose your location and distance range. Add any additional filters like cuisine type or price range.",
  },
  {
    icon: MapPinCheck,
    step: "03",
    title: "Explore the Map",
    description:
      "Browse restaurants on our interactive map. Green pins are perfect picks, blue are possible options.",
  },
  {
    icon: Utensils,
    step: "04",
    title: "Dine with Confidence",
    description:
      "Check detailed menu info, read reviews, and head to your chosen restaurant worry-free.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary">
            How It Works
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Safe Dining in 4 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            From setup to sitting down for a meal, we've made the process as
            easy as possible.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:left-1/2 lg:block lg:-translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`relative flex flex-col gap-8 lg:flex-row lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                  }`}
                >
                  <div
                    className={`rounded-2xl border border-border bg-card p-8 shadow-md ${
                      index % 2 === 0 ? "lg:ml-auto" : ""
                    } max-w-lg`}
                  >
                    <span className="mb-4 inline-block font-display text-4xl font-bold text-primary/20">
                      {step.step}
                    </span>
                    <h3 className="mb-3 font-display text-2xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-0 top-8 z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-background bg-primary shadow-lg lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                {/* Spacer for layout */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
