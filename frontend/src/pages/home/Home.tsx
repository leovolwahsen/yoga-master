import { Gallery } from "./gallary/Gallery"
import { HomeContainer } from "./sliders/HomeConainer"

export const Home = () => {
  return (
    <section>
      <HomeContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallery />
      </div>
    </section>
  )
}
