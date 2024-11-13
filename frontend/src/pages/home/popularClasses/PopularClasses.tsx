import { useEffect, useState } from "react";
import { useAxios } from "../../../data/useAxios";

export const PopularClasses = () => {
    const axiosData = useAxios();
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const axiosClasses = async () => {
            const response = await axiosData.get("/classes");
            // console.log(`axiosClasses: ${response.data}`)
            setClasses(response.data)
        }
        axiosClasses()
    }, [])

    console.log(`Axios classes: ${classes}`)
  return (
    <div className="md:w-[80%] mx-auto my-36">
        <div>
            <h1 className="text-5xl font-bold text-center">
                Our <span className="text-secondary">popular</span> classes
            </h1>
            <div className="w-[40%] text-center mx-auto my-4">
                <p className="text-gray-500">
                    Here are our most visited courses, have a look if you find one that suits you.
                </p>
            </div>
        </div>
    </div>
  )
}
