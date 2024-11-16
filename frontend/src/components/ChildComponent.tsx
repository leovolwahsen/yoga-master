import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../types/interfaces";

export const ChildComponent = () => {
  const { isDarkMode } = useOutletContext<OutletContext>();

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} p-8`}>
      <h1>This component respects dark mode!</h1>
    </div>
  );
};