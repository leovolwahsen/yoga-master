import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../types/interfaces";

export const Instructors = () => {
  const { isDarkMode } = useOutletContext<OutletContext>(); 

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} p-8`}>
      <h1>Instructors Page</h1>
    </div>
  );
};
