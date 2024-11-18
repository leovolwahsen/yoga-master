import { useOutletContext } from "react-router-dom";
import { IClassItem, IOutletContext } from "../types/interfaces";
import { useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";

export const Classes = () => {
  const { isDarkMode } = useOutletContext<IOutletContext>();
  const [classes, setClasses] = useState<IClassItem[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const axiosData = useAxios();

  const handleHover = (index: number | null) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosData.get("/classes").then((res) => {
      setClasses(res.data);
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} `}>
      <div className="md:w-[80%] mx-auto my-36">
        <div>
          <h1 className="text-5xl font-bold text-center">
            Our <span className="text-secondary">certified</span> classes
          </h1>
          <div className="w-[40%] text-center mx-auto my-4">
            <p className="text-gray-500">
              Here are our most visited courses, have a look if you find one that suits you.
            </p>
          </div>
        </div>
        <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {
            classes.map((element, index) => (
              <div
                key={index}
                onMouseLeave={() => handleHover(null)}
                className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${element?.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                onMouseEnter={() => handleHover(index)
                }
                >
                <div className="relative h-48">
                  <div
                    className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? "opacity-60" : ""}`} />
                  <img
                    src={element?.image} alt="image of yoga class"
                    className="object-cover w-full h-full" />
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
};
