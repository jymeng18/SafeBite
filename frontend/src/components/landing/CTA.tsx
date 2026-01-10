import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-16">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary-foreground/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                100% Free to Use
              </span>
            </div>

            <h2 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              Ready to Dine Without Worry?
            </h2>

            <p className="mb-8 text-lg text-primary-foreground/80">
              Join thousands of people with food allergies who trust SafeBite to
              find safe restaurants every day.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/app">
                <Button
                  size="xl"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Start Finding Restaurants!
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
