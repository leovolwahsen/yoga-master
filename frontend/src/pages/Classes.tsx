import { useOutletContext } from "react-router-dom";
import { IClassItem, IOutletContext } from "../types/interfaces";
import { useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";
import { Transition } from '@headlessui/react'


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
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"} p-8`}>
      <div className="md:w-[80%] mx-auto my-20">
        <div>
          <h1 className="text-5xl font-bold text-center text-secondary">
            Classes
          </h1>
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
                  <Transition show={hoveredCard === index}>
                    <div className="absolute inset-0 flex items-center justify-center transition duration-300 ease-in data-[closed]:opacity-0">
                     <button type="button" className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">Add to cart</button>
                    </div>
                  </Transition>
                </div>
                {/* description of card */}
                <div className="px-6 py-2">
                  <h3 className="font-bold">{element?.name}</h3>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
};
