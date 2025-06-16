import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react"; // Placeholder icon
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Generate Excuse", href: "/generate-excuse" },
  { name: "Alibi Builder", href: "/alibi-builder" },
  { name: "Excuse Vault", href: "/excuse-vault" },
  { name: "Lie Detector", href: "/lie-detector" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Lightbulb className="h-8 w-8 text-primary" />
            <span className="font-heading text-2xl font-bold text-primary">Excusely</span>
          </Link>
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "font-medium text-sm hover:text-primary transition-colors",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground/70"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>
          {/* Mobile menu button can be added later */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
