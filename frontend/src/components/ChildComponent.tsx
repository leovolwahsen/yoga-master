import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../types/interfaces";

export const ChildComponent = () => {
  const { isDarkMode } = useOutletContext<IOutletContext>();

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} p-8`}>
      <h1>This component respects dark mode!</h1>
    </div>
  );
};