import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/30" />

      <div className="container relative mx-auto px-4">
        <div className="grid min-h-[calc(100vh-6rem)] items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Allergy-safe dining made easy
              </span>
            </div>

            <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Find Food
              <br />
              <span className="text-primary">You Can Eat</span>
            </h1>

            <p className="mb-8 max-w-lg text-lg text-muted-foreground md:text-xl">
              Filter by allergens & dietary options, see detailed menu
              information, and dine with confidence.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/app">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Search className="h-5 w-5" />
                  Start Browsing
                </Button>
              </Link>
              <Button variant="hero-outline" size="xl">
                <MapPin className="h-5 w-5" />
                Find Near Me
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <p className="font-display text-3xl font-bold text-foreground">
                  10K+
                </p>
                <p className="text-sm text-muted-foreground">Restaurants</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-foreground">
                  50+
                </p>
                <p className="text-sm text-muted-foreground">
                  Allergens Tracked
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-foreground">
                  99%
                </p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative hidden lg:block">
            <div className="animate-float">
              {/* Phone Frame */}
              <div className="relative mx-auto w-[320px] rounded-[3rem] border-8 border-foreground bg-foreground p-2 shadow-2xl">
                {/* Screen */}
                <div className="aspect-[9/19] overflow-hidden rounded-[2.5rem] bg-card">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between bg-card px-6 py-3">
                    <span className="text-xs font-medium text-foreground">
                      9:41
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-4 rounded-sm bg-foreground" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-4">
                    <div className="mb-4 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Search restaurants...
                      </span>
                    </div>

                    {/* Map Preview */}
                    <div className="relative mb-4 h-32 overflow-hidden rounded-xl bg-accent">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg">
                          <MapPin className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                      {/* Fake markers */}
                      <div className="absolute left-1/4 top-1/3 h-4 w-4 rounded-full bg-pick shadow" />
                      <div className="absolute right-1/4 top-1/2 h-4 w-4 rounded-full bg-possible shadow" />
                      <div className="absolute bottom-1/3 right-1/3 h-4 w-4 rounded-full bg-pick shadow" />
                    </div>

                    {/* Restaurant Cards */}
                    <div className="space-y-3">
                      <div className="rounded-xl border border-pick/30 bg-card p-3 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-foreground">
                            Bistro Verde
                          </span>
                          <span className="rounded-full bg-pick px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                            Pick
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Italian • 0.3 miles
                        </p>
                      </div>
                      <div className="rounded-xl border border-possible/30 bg-card p-3 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-foreground">
                            The Garden Plate
                          </span>
                          <span className="rounded-full bg-possible px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                            Possible
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Vegan • 0.5 miles
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -left-20 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-10 -right-20 h-60 w-60 rounded-full bg-accent blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
