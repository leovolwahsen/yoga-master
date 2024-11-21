import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom"
import { useAxios } from "../../data/useAxios";
import { useAxiosManagement } from "../../data/useAxiosManagement";
import { IClassItemData, IOutletContext } from "../../types/interfaces";
import image5 from "../../assets/profiles/woman.jpg"

export const Class = () => {
    const { isDarkMode } = useOutletContext<IOutletContext>();
    const course = useLoaderData() as IClassItemData;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosManagement = useAxiosManagement();
    const axiosData = useAxios();

    console.log(course);

    return (
        <div className={`${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"} py-8`}>
            <div className="w-[90%] mx-auto my-10">
                <div className="breadcrumbs bg-primary py-10 mt-20 section-padding bg-cover bg-center bg-no-repeat">
                    <div className="container text-center">
                        <h2>Class Details</h2>
                    </div>
                </div>
            </div>

            <div className="nav-tab-wrapper tabs section-padding m-8">
                <div className="container">
                    <div className="grid grid-cols-12 md:gap-[30px]">
                        {/* left content */}
                        <div className="lg:col-span-8 col-span-12">
                            <div className="class-details">
                                <div className="image-container mb-6">
                                    <img src={course?.data?.image} alt="class image" className="rounded-md object-fit h-[400px] w-full block mb-6" />
                                </div>

                                <h2 className="text-3xl mb-2">{course?.data?.description}</h2>
                                
                                <div className="mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                                    <div className="flex space-x-4 items-center group">
                                        <div className="flex-none">
                                            <div className="h-12 w-12 rounded">
                                                <img src={image5} alt="user image" className="object-cover w-full h-full rounded" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-secondary">
                                                Instructor: 
                                                <a href="#" className="text-black ml-1" >
                                                   {course?.data?.instructorName}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-secondary">
                                            Latest update:
                                            <a href="#" className="text-black ml-1">
                                                {new Date(course?.data?.submitted).toLocaleDateString()}
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* right content */}
                        <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
