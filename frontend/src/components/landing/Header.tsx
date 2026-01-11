import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="mx-auto max-w-6xl">
        <div className="glass rounded-2xl border border-border/50 px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
                <ShieldCheck className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                SafeBite
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden items-center gap-3 md:flex">
              <Link to="/app">
                <Button variant="hero" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4 md:hidden">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground"
              >
                About
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/app">
                  <Button variant="hero" size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
