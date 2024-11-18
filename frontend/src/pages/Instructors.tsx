import { Link, useOutletContext } from "react-router-dom";
import { IInstructors, IOutletContext } from "../types/interfaces";
import { useState, useEffect } from "react";
import { useAxios } from "../data/useAxios";

export const Instructors = () => {
    const { isDarkMode } = useOutletContext<IOutletContext>();
    const [instructor, setInstructor] = useState<IInstructors[]>([]);
    const axiosData = useAxios();

    useEffect(() => {
        axiosData.get("/instructors").then((res) => {
            setInstructor(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} p-8`}>
            <div className="md:w-[80%] mx-auto my-36">
            <div>
                <h1 className="text-5xl font-bold text-center">
                    Our <span className="text-secondary">certified</span> instructors
                </h1>
                <div className="w-[40%] text-center mx-auto my-4">
                    <p className="text-gray-500">
                        These instructors have had extensive training in schooling others to learn yoga
                    </p>
                </div>
            </div>
                {
                    instructor ?
                        <div className="grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto">
                            {
                                instructor.map((instructor, index) => (
                                    <div
                                        key={index}
                                        className={`flex hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-2xl ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
                                            } py-8 px-10 md:px-8 rounded-md`}
                                    >

                                        <div className="flex-col flex gap-6 md:gap-8">
                                            <div className="w-[120px] h-[120px] overflow-hidden relative border-4 border-gray-300 mx-auto rounded-full">
                                                <img
                                                    src={instructor?.photoUrl}
                                                    alt="image of person"
                                                    className="absolute inset-0 w-full object-cover"
                                                />
                                            </div>

                                            <div className="flex flex-col text-center">
                                                <p className="font-medium text-lg dark:text-white text-gray-800">{instructor?.name}</p>
                                                <p className="text-gray-500 mb-4">{instructor?.role}</p>
                                                <div className="flex flex-col items-center mb-4 space-y-1">
                                                    <div className="flex justify-between w-full max-w-[300px]">
                                                        <span>Address:</span>
                                                        <span>{instructor?.address || "not found"}</span>
                                                    </div>
                                                    <div className="flex justify-between w-full max-w-[300px]">
                                                        <span>Email:</span>
                                                        <span>{instructor?.email || "not found"}</span>
                                                    </div>
                                                    <div className="flex justify-between w-full max-w-[300px]">
                                                        <span>Phone:</span>
                                                        <span>{instructor?.phone || "not found"}</span>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <Link to={"/instructors"} className={`${isDarkMode ? "text-blue-400" : "text-purple-800"} italic`}>
                                                        View Profile
                                                    </Link>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        : <p>Currently there are no instructor information available!</p>
                }
            </div>
        </div>
    );
};
