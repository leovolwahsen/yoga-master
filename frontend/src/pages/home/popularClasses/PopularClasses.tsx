import { useEffect, useState } from "react";
import { useAxios } from "../../../data/useAxios";
import { Card } from "./Card";

export const PopularClasses = () => {
    const axiosInstance = useAxios();
    const [classes, setClasses] = useState([]);
 
    useEffect(() => {
        axiosInstance.get("/classes").then((res) => {
            setClasses(res.data);
        }).catch((err) => {
            console.error(`Error fetching classes data: ${err}`);	
        });
    }, [axiosInstance]);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                classes.slice(0,4).map((item, index) => <Card key={index} item={item} />)
            }
        </div>
    </div>
  )
}
