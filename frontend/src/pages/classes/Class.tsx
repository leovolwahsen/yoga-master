import { useLoaderData } from "react-router-dom"

export const Class = () => {
    const course = useLoaderData();
    console.log(course);
    
  return (
    <div>Class</div>
  )
}
