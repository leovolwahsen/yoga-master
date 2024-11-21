import { Outlet } from "react-router-dom";
import { Navbar } from "../components/headers/Navbar";
import { Footer } from "../components/footers/Footer";
import { useState } from "react";

export const PrimaryLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <main className={`flex flex-col min-h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-grow">
        <Outlet context={{ isDarkMode }} />
      </div>
      <Footer isDarkMode={isDarkMode} />
    </main>
  );
};
