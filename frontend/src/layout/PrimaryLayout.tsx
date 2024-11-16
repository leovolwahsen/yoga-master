import { Outlet } from "react-router-dom";
import { Navbar } from "../components/headers/Navbar";
import { Footer } from "../components/footers/Footer";
import { useState } from "react";

export const PrimaryLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <main className={`overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Outlet context={{ isDarkMode }} />
      <Footer isDarkMode={isDarkMode} />
    </main>
  );
};
