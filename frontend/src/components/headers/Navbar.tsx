import { useEffect, useState } from "react";
import logo from "../../assets/welcome/logo.png";
import guy from "../../assets/profiles/guy.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { INavbarProps } from "../../types/interfaces";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

export const Navbar: React.FC<INavbarProps> = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [navBg, setNavBg] = useState("bg-[#15151580]");
  const [user] = useState(true);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(location.pathname === "/register" || location.pathname === "/login");
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNavBg(
      isHome
        ? "bg-white backdrop-filter backdrop-blur-xl bg-opacity-20 dark:text-white text-black"
        : "bg-white dark:bg-black dark:text-white text-black"
    );
  }, [scrollPosition, isHome]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"} 
        ${isFixed ? "static" : "fixed"} top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center"
          >
            <div>
              <h1
                className={`text-2xl inline-flex gap-3 items-center font-bold ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                Yoga Guide
                <img src={logo} alt="YogaGuide Logo" className="w-8 h-8" />
              </h1>
              <p
                className={`font-bold text-[13px] tracking-[3px] ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                Improve on yesterday
              </p>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6 text-secondary" />
              ) : (
                <FaBars className="h-6 w-6 hover:text-secondary" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block text-black dark:text-white">
            <ul className="ml-10 flex items-center space-x-4 pr-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) =>
                      `font-bold ${isActive
                        ? `${isDarkMode ? "text-secondary" : "text-secondary"}`
                        : `${isDarkMode ? "text-white" : "text-black"}`
                      } hover:text-secondary duration-300`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {user && (
                <>
                  <li>
                    <img
                      src={guy}
                      alt="Profile"
                      className="h-[40px] w-[40px] rounded-full"
                    />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              <li>
                <ThemeProvider theme={theme}>
                  <div className="flex flex-col justify-center items-center">
                    <Switch onChange={() => setIsDarkMode(!isDarkMode)} checked={isDarkMode} />
                    <h1 className="text-[8px]">Light/Dark</h1>
                  </div>
                </ThemeProvider>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white dark:bg-black z-20 flex flex-col items-center justify-center">
          <ul className="space-y-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    `text-lg font-bold ${isActive
                      ? "text-secondary"
                      : `${isDarkMode ? "text-white" : "text-black"}`
                    } hover:text-secondary duration-300`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <ThemeProvider theme={theme}>
                <Switch onChange={() => setIsDarkMode(!isDarkMode)} checked={isDarkMode} />
              </ThemeProvider>
            </li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
};
