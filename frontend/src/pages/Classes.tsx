import { Link, useOutletContext } from "react-router-dom";
import { IClassItem, IOutletContext } from "../types/interfaces";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";
import { Transition } from '@headlessui/react'
import { AuthContext } from "../utilities/providers/AuthenticationProvider";


export const Classes = () => {
  const { isDarkMode } = useOutletContext<IOutletContext>();
  const [classes, setClasses] = useState<IClassItem[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const axiosData = useAxios();

  const {user} = useContext(AuthContext);
  console.log(`User data with AuthProv: ${user}`);
  

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
          <h1 className="text-5xl font-bold text-center text-secondary mb-8">
            Classes
          </h1>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 items-stretch">
          {
            classes.map((element, index) => (
              <div
                key={index}
                onMouseLeave={() => handleHover(null)}
                className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 min-h-[300px] mx-auto ${element?.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col`}
                onMouseEnter={() => handleHover(index)}
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
                <div className="px-6 py-4 flex flex-col h-full justify-between">
                  <h3 className="font-semibold">{element?.name}</h3>
                  <p className="text-gray-500 text-xs">Instructor: {element?.instructorName}</p>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 text-xs">Available seats: {element?.availableSeats}</span>
                    <span className="text-blue-500 font-bold">{element?.price}€</span>
                  </div>
                  <Link to={`/class/${element?._id}`} >
                    <button
                      type="button"
                      className="px-4 py-2 mt-2 mb-1 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                      View class
                    </button>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
