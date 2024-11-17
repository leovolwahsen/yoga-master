import { useOutletContext } from "react-router-dom";
import { PopularClasses } from "./popularClasses/PopularClasses";
import { PopularInstructors } from "./popularInstructors/PopularInstructors";
import { HomeContainer } from "./sliders/HomeConainer";
import { Gallery } from "./gallary/Gallery";
import { IOutletContext } from "../../types/interfaces";

export const Home = () => {
  const { isDarkMode } = useOutletContext<IOutletContext>();

  return (
    <section className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <HomeContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallery />
        <PopularClasses />
        <PopularInstructors />
      </div>
    </section>
  );
};
