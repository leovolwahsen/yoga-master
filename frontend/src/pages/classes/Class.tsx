import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useAxios } from "../../data/useAxios";
import { useAxiosManagement } from "../../data/useAxiosManagement";
import { IClassItemData, IOutletContext } from "../../types/interfaces";
import image5 from "../../assets/profiles/woman.jpg";
import { FaCheck } from "react-icons/fa6";

export const Class = () => {
    const { isDarkMode } = useOutletContext<IOutletContext>();
    const course = useLoaderData() as IClassItemData;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosManagement = useAxiosManagement();
    const axiosData = useAxios();

    console.log(course);

    return (
        <div className={`${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"} py-8`}>
            <div className="w-full mx-auto">
                <div className="breadcrumbs py-10 mt-20 bg-cover bg-center bg-no-repeat">
                    <div className="container mx-auto max-w-[90%] text-center">
                        <h2 className="text-3xl font-bold">Class Details</h2>
                    </div>
                </div>
            </div>

            <div className="nav-tab-wrapper tabs section-padding">
                <div className="container mx-auto max-w-[90%]">
                    <div className="grid grid-cols-12 md:gap-[30px]">
                        {/* left content */}
                        <div className="lg:col-span-8 col-span-12">
                            <div className="class-details">
                                <div className="image-container mb-6">
                                    <img
                                        src={course?.data?.image}
                                        alt="class image"
                                        className="rounded-md object-cover h-[400px] w-full block mb-6"
                                    />
                                </div>

                                <h2 className="text-3xl mb-2">{course?.data?.description}</h2>

                                <div className="mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                                    <div className="flex space-x-4 items-center group">
                                        <div className="flex-none">
                                            <div className="h-12 w-12 rounded">
                                                <img
                                                    src={image5}
                                                    alt="user image"
                                                    className="object-cover w-full h-full rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-secondary">
                                                Instructor:
                                                <a href="#" className="text-black ml-1">
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

                                <div className="nav-tab-wrapper mt-12">
                                    <ul id="tabs-nav" className="course-tab mb-8">
                                        <li className="active">
                                            <a href="#tab1">Overview</a>
                                        </li>
                                        <li>
                                            <a href="#tab2">Curriculum</a>
                                        </li>
                                        <li>
                                            <a href="#tab3">Instructor</a>
                                        </li>
                                        <li>
                                            <a href="#tab4">Rating</a>
                                        </li>
                                    </ul>
                                    <div id="tabs-content">
                                        <div id="tab1" className="tab-content">
                                            <div>
                                                <h3 className="text-2xl mt-8">Class description</h3>
                                                <p className="mt-4">Discover tranquility and strength in our rejuvenating yoga class. Designed for all levels, this session blends mindful breathing, flowing sequences, and deep stretches to enhance flexibility, balance, and inner peace. Guided by an experienced instructor, you'll explore poses that align mind and body, releasing tension and cultivating mindfulness. Whether you're seeking relaxation or a gentle challenge, our supportive environment invites you to connect with your practice. Leave feeling refreshed, centered, and ready to embrace the day ahead.</p>
                                                <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                                                    <h4 className="text-2xl">You will learn the following</h4>
                                                    <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                                                        <li className="flex space-x-3">
                                                            <div className="flex-none relative top-1">
                                                            <FaCheck size={30} color="green"/>
                                                            </div>
                                                            <div className="flex-1">
                                                            Improve your physical mobility and build strength through flowing sequences and deep stretches designed for all levels.
                                                            </div>
                                                        </li>

                                                        <li className="flex space-x-3">
                                                            <div className="flex-none relative top-1">
                                                            <FaCheck size={30} color="green"/>
                                                            </div>
                                                            <div className="flex-1">
                                                            Practice mindful breathing and relaxation techniques that promote a sense of calm and focus, helping you connect mind and body.
                                                            </div>
                                                        </li>

                                                        <li className="flex space-x-3">
                                                            <div className="flex-none relative top-1">
                                                            <FaCheck size={30} color="green"/>
                                                            </div>
                                                            <div className="flex-1">
                                                            Release physical and mental tension through guided poses, leaving you feeling refreshed and rejuvenated.
                                                            </div>
                                                        </li>

                                                        <li className="flex space-x-3">
                                                            <div className="flex-none relative top-1">
                                                            <FaCheck size={30} color="green"/>
                                                            </div>
                                                            <div className="flex-1">
                                                            Strengthen your core and enhance overall balance, contributing to better posture and alignment in daily life.
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="text-2xl">These skills you will master</h4>
                                                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                                                        <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                                            <span className="flex-none">
                                                               
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* right content */}
                        <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
