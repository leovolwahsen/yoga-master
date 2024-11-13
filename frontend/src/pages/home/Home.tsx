import { Gallery } from "./gallary/Gallery"
import { PopularClasses } from "./popularClasses/PopularClasses"
import { HomeContainer } from "./sliders/HomeConainer"

export const Home = () => {
  return (
    <section>
      <HomeContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallery />
        <PopularClasses />
      </div>
    </section>
  )
}
