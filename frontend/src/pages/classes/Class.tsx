import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useAxiosManagement } from "../../data/useAxiosManagement";
import { IClassItemData, IOutletContext } from "../../types/interfaces";
import { FaCheck, FaEuroSign, FaUser, FaLevelUpAlt, FaLanguage, FaBookOpen, FaPlayCircle } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiBackPain, GiMeditation } from "react-icons/gi";
import { FaHeadSideVirus } from "react-icons/fa";
import { toast } from "react-toastify";

export const Class = () => {
    const { isDarkMode } = useOutletContext<IOutletContext>();
    const course = useLoaderData() as IClassItemData;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
    const axiosManagement = useAxiosManagement();

    const handleSelect = (_id: string, email: string) => {
        if (!email) return toast.error("Can not add to cart");

        axiosManagement.get(`/enrolled-classes/${email}`).then((res) => setEnrolledClasses(res.data));
        axiosManagement.get(`/cart-item/${_id}?email=${email}`).then((res) => {
            if (res.data.clasId === _id) {
                toast.error("Cart item is already selected!");
            } else if (enrolledClasses.some((item: { classes: { _id: string } }) => item.classes._id === _id)) {
                toast.error("It already has been enrolled!");
            } else {
                const data = { clasId: _id, userMail: email, date: new Date() };
                toast.promise(axiosManagement.post("/add-to-cart", data), {
                    pending: "Adding to cart...",
                    success: "Item added to cart successfully!",
                    error: "Failed to add item to cart.",
                });
            }
        });
    };

    const sections = [
        { id: "overview", title: "Overview" },
        { id: "skills", title: "Skills" },
        { id: "rating", title: "Rating" },
    ];

    const details = [
        { icon: <FaEuroSign />, label: "Price", value: `${course?.data?.price}€` },
        { icon: <FaUser />, label: "Instructor", value: course?.data?.instructorName },
        { icon: <FaBookOpen />, label: "Sessions", value: "12" },
        { icon: <MdAccessTimeFilled />, label: "Time", value: "2 hours, 30 min" },
        { icon: <FaPeopleGroup />, label: "Enrolled", value: course?.data?.totalEnrolled },
        { icon: <FaLevelUpAlt />, label: "Class level", value: "Basic" },
        { icon: <FaLanguage />, label: "Language", value: "English" },
    ];

    const skills = [
        { icon: <FaHeadSideVirus size={30} />, label: "Reduced stress" },
        { icon: <GiBackPain size={30} />, label: "Strengthening the back" },
        { icon: <GiMeditation size={30} />, label: "Mindfulness" },
    ];

    return (
        <div className={`${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"} py-8`}>
            <div className="w-full mx-auto text-center max-w-[90%]">
                <div className="breadcrumbs py-10 mt-20 bg-cover bg-center bg-no-repeat">
                    <h2 className="text-3xl font-bold">{course?.data?.name}</h2>
                </div>
                <ul className={`course-tab mb-8 flex space-x-4 border-b pb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
                    {sections.map(({ id, title }) => (
                        <li key={id}>
                            <a href={`#${id}`} className={`py-2 px-4 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                                {title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="container mx-auto max-w-[90%] grid grid-cols-12 md:gap-[30px]">
                {/* Left Content */}
                <div className="lg:col-span-8 col-span-12" id="overview">
                    <img
                        src={course?.data?.image}
                        alt="class image"
                        className="rounded-md object-cover h-[400px] w-full block mb-6"
                    />
                    <h3 className="text-2xl mt-8">{course?.data?.description}</h3>
                    <p className="mt-4">
                        Discover tranquility and strength in our rejuvenating yoga class. Designed for all levels, this session blends mindful breathing, flowing sequences, and deep stretches to enhance flexibility, balance, and inner peace.
                    </p>

                    <section className="bg-[#F8F8F8] dark:bg-indigo-500 p-8 rounded-md my-8"  id="skills">
                        <h4 className="text-2xl">You will learn the following</h4>
                        <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6 mt-4">
                            {["Improve your physical mobility and build strength.", "Practice mindful breathing techniques.", "Release tension through guided poses.", "Enhance core strength and posture."].map((item, index) => (
                                <li key={index} className="flex space-x-3">
                                    <FaCheck size={30} color="green" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h4 className="text-2xl">These skills you will master</h4>
                        <div className={`grid lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-5 ${isDarkMode ? "text-white bg-gray-800" : "text-black bg-white"}`}>
                            {skills.map(({ icon, label }, index) => (
                                <div key={index} className="rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                    {icon}
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Content */}
                <div className={`lg:col-span-4 col-span-12 ${isDarkMode ? "text-white" : "text-black"}`} id="rating">
                    <div className="class-side-content space-y-[30px]">
                        <div className="video-wrapper space-y-5">
                            <a className="h-[230px] rounded block relative">
                                <img src={course?.data?.image} alt="yoga video" className="block w-full h-full object-cover rounded-md" />
                                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <FaPlayCircle color="red" size={50} />
                                </div>
                            </a>
                            <button
                                onClick={() => handleSelect(course?.data?._id, course?.data?.instructorEmail)}
                                className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white rounded-md"
                                disabled={course?.data?.availableSeats < 1}
                            >
                                Join class
                            </button>
                            <ul>
                                {details.map(({ icon, label, value }, index) => (
                                    <li key={index} className="flex space-x-3 border-b mb-4 pb-4">
                                        <div className="flex-1 flex space-x-3 items-center">
                                            {icon}
                                            <span className="font-semibold">{label}</span>
                                        </div>
                                        <span>{value}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className={`rating-section p-5 rounded ${isDarkMode ? "text-white bg-gray-800" : "text-black bg-white"}`}>
                                <h4 className="text-xl font-semibold">Rate this Class</h4>
                                <div className="flex space-x-2 mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            onClick={() => setSelectedRating(index + 1)}
                                            className={`cursor-pointer ${index < selectedRating ? "text-yellow-500" : "text-gray-400"}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                {selectedRating > 0 && <p className="text-gray-500 mt-2">You rated this class {selectedRating} out of 5.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
