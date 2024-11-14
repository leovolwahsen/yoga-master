import { useEffect, useState } from "react";
import { useAxios } from "../../../data/useAxios";

export interface InstructorInterface {
    totalEnrolled: number
    instructor: {
        _id: string
        name: string
        email: string
        photoUrl: string
        gender: string
        address: string
        role: string
        phone: string,
        about: string,
        skills: string
    }
  }
export const PopularInstructors = () => {
    const [instructor, setInstructor] = useState<InstructorInterface[]>([]);
    const axiosData = useAxios();

    useEffect(() => {
         axiosData.get("/popular-instructors").then((res) => {
            setInstructor(res.data);
            }).catch ((err) => {
                console.log(err)
            })    
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
    
    {
        instructor ? 
        <>
       <div>
    {
        instructor?.map((instructor, index) => (
            <div key={index}>
                <div className="">
                    <img 
                        src={instructor?.instructor?.photoUrl} 
                        alt="image of person" 
                        className="h-[60px] w-[60px] rounded-full border-4 border-gray-300 mx-auto"
                      
                    />
                </div>
            </div>
        ))
    }
</div>

        </> : <></>
    }
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
       
    </div>
</div>
  )
}
