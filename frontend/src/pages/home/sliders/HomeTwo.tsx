import image2 from "../../../assets/homepage/image2.jpg"

export const HomeTwo = () => {
  return (
    <div 
    className="min-h-screen bg-cover bg-black" 
    style={{ backgroundImage: `url(${image2})`}}>
      <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60">
        <div>
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl">Quality Online</p>
            <h1 className="md:text-7xl text-4xl font-bold">Courses for you</h1>
            <div className="md:w-1/2">
              <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure possimus distinctio expedita! Inventore obcaecati libero sint laudantium. Adipisci, officia quae aliquid, laboriosam facere incidunt reprehenderit, neque dolorum sequi nobis blanditiis.</p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">
                Start now
              </button>
              <button className="px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase">
                Discover our courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
