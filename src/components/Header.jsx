import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Atom } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/AuthProvider";
import NewLogo from "../../Fall Fest Graphics/Badge/Badge.png"; // Import the new logo image

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Schedule", href: "/schedule" },
    { name: "Workshops", href: "/workshops" },
    { name: "Speakers", href: "/speakers" },
    { name: "Hackathon", href: "/hackathon" },
    { name: "Materials", href: "/materials" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = (href) => location.pathname === href;

  // Auth button for desktop navigation
  const authButton = user ? (
    <Button variant="ghost" onClick={() => signOut()}>
      Sign Out
    </Button>
  ) : (
    <Button variant="default" asChild>
      <Link to="/login">Sign In</Link>
    </Button>
  );

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-card shadow-lg backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      } h-16 sm:h-20`} // Added responsive height
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="Qiskit Fall Fest 2025 Home"
          >
            <motion.div
              className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={NewLogo}
                alt="Qiskit Fall Fest Logo"
                className="h-10 w-50 object-contain"
              />
            </motion.div>
          </Link>
          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary focus:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1 ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Add auth button to desktop navigation */}
            {/* {authButton} */}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button> */}

            {/* CTA Button - Show Register or Sign In based on auth status */}
            {/* {!user && (
              <Link to="/register" className="hidden sm:block">
                <Button className="text-primary-foreground">
                  Register Now
                </Button>
              </Link>
            )} */}

            <Button className="text-primary-foreground">
              <a href="">Register Now</a>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden w-9 h-9 rounded-full bg-background/80 hover:bg-background/90" // Added background for better visibility
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-background text-foreground p-4 shadow-lg border-l border-white/10 min-h-screen overflow-y-auto" // Made width responsive
              >
                <div className="flex flex-col space-y-4 pt-4 flex-grow">
                  {" "}
                  // Reduced spacing
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Atom className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold font-poppins">
                        Qiskit Fall Fest
                      </h2>
                      <p className="text-xs text-muted-foreground -mt-1">
                        IIIT Srikakulam 2025
                      </p>
                    </div>
                  </div>
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3" role="navigation">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          isActive(item.href)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Add auth option to mobile menu */}
                    {user ? (
                      <button
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-muted-foreground hover:text-primary hover:bg-primary/5"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-muted-foreground hover:text-primary hover:bg-primary/5"
                      >
                        Sign In
                      </Link>
                    )}
                  </nav>
                  {/* Mobile CTA - Only show if not logged in */}
                  {!user && (
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block"
                    >
                      <Button className="w-full btn-quantum text-primary-foreground">
                        Register Now
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
