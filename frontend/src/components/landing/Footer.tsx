import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
            
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
                <ShieldCheck className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                SafeBite
              </span>
            </Link>
            <p className="max-w-md text-muted-foreground">
              Helping people with food allergies find safe, delicious dining
              options since 2024. Because everyone deserves to eat out with
              confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-foreground"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-foreground"
                >
                  How It Works
                </a>
              </li>
              <li>
                <Link
                  to="/app"
                  className="transition-colors hover:text-foreground"
                >
                  Find Restaurants
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-foreground"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  For Restaurants
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 SafeBite. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
