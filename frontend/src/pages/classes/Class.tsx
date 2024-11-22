import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useAxios } from "../../data/useAxios";
import { useAxiosManagement } from "../../data/useAxiosManagement";
import { IClassItemData, IOutletContext } from "../../types/interfaces";
import image5 from "../../assets/profiles/woman.jpg";
import { FaCheck } from "react-icons/fa6";
import { GiBackPain, GiMeditation } from "react-icons/gi";
import { FaHeadSideVirus, FaPlayCircle } from "react-icons/fa"
import { toast } from "react-toastify";

export const Class = () => {
    const { isDarkMode } = useOutletContext<IOutletContext>();
    const course = useLoaderData() as IClassItemData;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosManagement = useAxiosManagement();

    const handleSelect = (_id: string, email: string) => {

        if (!email) {
          return toast.error("Can not add to cart")
        }
    
        axiosManagement.get(`/enrolled-classes/${email}`)
          .then(res => setEnrolledClasses(res.data)).catch(error => console.error(error));
    
        axiosManagement.get(`/cart-item/${_id}?email=${email}`)
        .then(res => {
          if (res.data.clasId == _id) {
            return toast.error("Cart item is already selected!")
          } else if (enrolledClasses.find((item: { classes: { _id: string; }; }) => item.classes._id === _id)) {
            return toast.error("It already has been enrolled!")
          } else {
            const data = {
              clasId: _id,
              userMail: email,
              data: new Date()
            }
    
            toast.promise(axiosManagement.post('/add-to-cart', data),
            {
              pending: 'Adding to cart...',
              success: 'Item added to cart successfully!',
              error: 'Failed to add item to cart.'
            }
          ).then(res => {
              console.log(res.data);
            })
          }
        });
      }

    return (
        <div className={`${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"} py-8`}>
            <div className="w-full mx-auto">
                <div className="breadcrumbs py-10 mt-20 bg-cover bg-center bg-no-repeat">
                    <div className="container mx-auto max-w-[90%] text-center">
                        <h2 className="text-3xl font-bold">{course?.data?.name}</h2>
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
                                                                <FaCheck size={30} color="green" />
                                                            </div>
                                                            <div className="flex-1">
                                                                Improve your physical mobility and build strength through flowing sequences and deep stretches designed for all levels.
                                                            </div>
                                                        </li>

                                                        <li className="flex space-x-3">
                                                            <div className="flex-none relative top-1">
                                                                <FaCheck size={30} color="green" />
                                                            </div>
                                                            <div className="flex-1">
                                                                Practice mindful breathing and relaxation techniques that promote a sense of calm and focus, helping you connect mind and body.
                                                            </div>
                                                        </li>

                                                        <li className="flex space-x-3">
                                                            <div className="flex-none relative top-1">
                                                                <FaCheck size={30} color="green" />
                                                            </div>
                                                            <div className="flex-1">
                                                                Release physical and mental tension through guided poses, leaving you feeling refreshed and rejuvenated.
                                                            </div>
                                                        </li>

                                                        <li className="flex space-x-3">
                                                            <div className="flex-none relative top-1">
                                                                <FaCheck size={30} color="green" />
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
                                                            <div className="flex-none">
                                                                <FaHeadSideVirus size={30} />
                                                            </div>
                                                            <span className="flex-none">
                                                                Reduced stress
                                                            </span>
                                                        </div>
                                                        <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                                            <div className="flex-none">
                                                                <GiBackPain size={30} />
                                                            </div>
                                                            <span className="flex-none">
                                                                Strengthening the back
                                                            </span>
                                                        </div>
                                                        <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                                            <div className="flex-none">
                                                                <GiMeditation size={30} />
                                                            </div>
                                                            <span className="flex-none">
                                                                Mindfullness
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab2" className="tab-content">
                                            <div>
                                                <h3 className="text-2xl mt-8">Overview of class</h3>
                                                <p className="mt-4">
                                                    Experience a transformative journey in our rejuvenating yoga class, designed for practitioners of all levels. This class combines mindful breathing, fluid movements, and deep stretches to enhance flexibility, strength, and balance while promoting inner peace. Under the guidance of an experienced instructor, you'll practice poses that align your mind and body, release tension, and cultivate mindfulness. Whether seeking relaxation or a gentle challenge, this supportive environment offers a space to recharge and reconnect. Leave feeling refreshed, centered, and ready to embrace life's demands with renewed vitality.
                                                </p>
                                                <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                                                    <h4 className="text-2xl">Yoga for Beginners</h4>
                                                </div>
                                                <div>
                                                    <h4 className="text-2xl">You will learn the following</h4>
                                                    <p className="mt-4">
                                                        In a beginner rejuvenating yoga class, you'll learn foundational poses and techniques to build strength, improve flexibility, and enhance balance. Discover the art of mindful breathing to calm the mind and reduce stress. Guided by an experienced instructor, you'll explore gentle sequences and deep stretches that promote relaxation and physical alignment. You'll also develop an understanding of proper posture, body awareness, and mindfulness practices. Leave each session feeling refreshed, centered, and equipped to integrate yoga into your daily life.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* right content */}
                        <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                            <div className="class-side-content space-y-[30px]">
                                <div className="video-wrapper space-y-5">
                                    <a className="h-[230px] rounded relative block" href="#">
                                        <img src={course?.data?.image} alt="yoga video" className="block w-full h-full object-cover rounded-md" />
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <FaPlayCircle color="red" size={30} />
                                        </div>
                                    </a>
                                    <h3 className="text-2xl mt-8">{course?.data?.price}€</h3>
                                    <button onClick={() => handleSelect(course?.data?._id, course?.data?.instructorEmail)} title={course?.data?.availableSeats < 1 ? 'No more seats are available': 'This class still has seats available!'} disabled={course?.data?.availableSeats < 1 } className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white rounded-md" >Join class</button>
                                    <ul className="overview">
                                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 last:border-0">
                                            <div></div>
                                        </li>
                                        <li>
                                            <div></div>
                                        </li>
                                        <li>
                                            <div></div>
                                        </li>
                                        <li>
                                            <div></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
