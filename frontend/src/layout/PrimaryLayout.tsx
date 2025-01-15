import { Outlet } from "react-router-dom";
import { Navbar } from "../components/headers/Navbar";
import { Footer } from "../components/footers/Footer";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PrimaryLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Function to trigger toast messages
  const triggerToast = (type: "success" | "error", message: string) => {
    if (type === "success") {
      toast.success(message, { autoClose: 5000 });
    } else {
      toast.error(message, { autoClose: 5000 });
    }
  };

  useEffect(() => {
    toast.success("This is a test message from PrimaryLayout");
  }, [isDarkMode]);

  return (
    <main className={`flex flex-col min-h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-grow">
        <Outlet context={{ isDarkMode }} />
      </div>
      <Footer isDarkMode={isDarkMode} triggerToast={triggerToast} />
    </main>
  );
};
