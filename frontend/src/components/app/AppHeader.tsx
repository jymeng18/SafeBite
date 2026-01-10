import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu, X, Search } from "lucide-react";
import { useState } from "react";

const AppHeader = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <header className="border-b border-border bg-card px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            SafeBite
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden max-w-md flex-1 px-8 md:block">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Log In
          </Button>
          <Button variant="default" size="sm">
            Sign Up
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            {mobileFiltersOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 md:hidden">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search restaurants..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
