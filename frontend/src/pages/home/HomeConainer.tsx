import { Swiper, SwiperSlide } from 'swiper/react';
import { Home } from './Home';
import { SecondaryHome } from './SecondaryHome';
import { EffectCreative } from 'swiper/modules';


export const HomeConainer = () => {
  return (
    <section>
        <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
            prev: {
                shadow: true,
                translate: ["-120%", 0, -500]
            },
            next: {
                shadow: true,
                translate: ["120%", 0, -500]
            }
        }}
        modules={[EffectCreative]}
        className='mySwiper5'
        loop={true}
        autoplay={{
            delay: 250,
            disableOnInteraction: false
        }}
        >
            <SwiperSlide>
                <Home />
            </SwiperSlide>
            <SwiperSlide>
                <SecondaryHome />
            </SwiperSlide>
        </Swiper>
    </section>
)
}
