import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
      role="navigation" 
      aria-label="Main navigation" // Provides a descriptive label for assistive technologies
    >
      <div className="container flex items-center justify-between">
        <a 
          className="text-xl font-bold text-primary flex items-center" 
          href="#hero"
          aria-label="Go to Home section" 
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">AxelTech</span> Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden md:flex space-x-8" aria-label="Desktop navigation links"> 
          <ul className="flex space-x-8"> 
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* mobile nav toggle button */}
        <button 
          onClick={() => setIsMenuOpen((prev) => (!prev))} 
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen} 
        > 
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />} 
        </button>

        {/* mobile nav menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/95 background-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          )}
          role="dialog" 
          aria-modal="true" 
          aria-label="Mobile navigation menu"
          aria-hidden={!isMenuOpen} 
        >
          {/* Changed div to nav and added role="navigation" for semantic HTML */}
          <nav className="flex flex-col space-y-8 text-xl" aria-label="Mobile navigation links">
            <ul className="flex flex-col space-y-8 text-xl">
              {navItems.map((item) => (
                <li key={item.name}> 
                  <a 
                    href={item.href} 
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};