import { useEffect, useState } from "react";
import { useAxios } from "../../../data/useAxios";

export const PopularInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const axiosData = useAxios();

    useEffect(() => {
        const axiosClasses = async () => {
            const response = await axiosData.get("/popular-instructors");
            setInstructors(response.data)
        }
        axiosClasses()
    }, []);
  return (
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

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
       
    </div>
</div>
  )
}
