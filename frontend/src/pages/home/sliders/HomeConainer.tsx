import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { HomeOne } from "./HomeOne";
import { HomeTwo } from "./HomeTwo";

export const HomeContainer = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        autoplay: false,
        autoplaySpeed: 2500,
        arrows: false,
    };

    return (
        <div className="w-full h-screen">
            <Slider {...settings}>
                <div className="h-screen">
                    <HomeOne />
                </div>
                <div className="h-screen">
                    <HomeTwo />
                </div>
            </Slider>
        </div>
    );
};
