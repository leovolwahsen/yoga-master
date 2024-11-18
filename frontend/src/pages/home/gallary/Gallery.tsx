import image4 from "../../../assets/homepage/image4.jpg";
import image5 from "../../../assets/homepage/image5.jpg";


export const Gallery = () => {
  return (
    <div className="md:w-[80%] mx-auto my-36">
        <div className="mb-16">
            <h1 className="text-5xl font-bold text-center">Our Gallery</h1>
        </div>

         {/* image container  */}
        <div className="md:grid grid-cols-2 items-center justify-center border gap-4">
            <div className="mb-4 md:mb-0">
                <img src={image4} alt="image of person doing yoga" 
                className="md:h-[720px] w-full mx-auto rounded-sm"/>
            </div>

            <div className="gap-4 grid grid-cols-2 items-start">
                <div>
                    <img src={image5} alt="image of person meditation" 
                    className="md:h-[350px] rounded-sm"/>
                </div>
                <div>
                    <img src={image5} alt="image of person meditation" 
                    className="md:h-[350px] rounded-sm"/>
                </div>
                <div>
                    <img src={image5} alt="image of person meditation" 
                    className="md:h-[350px] rounded-sm"/>
                </div>
                <div>
                    <img src={image5} alt="image of person meditation" 
                    className="md:h-[350px] rounded-sm"/>
                </div>
            </div>
        </div>
    </div>
  )
}
