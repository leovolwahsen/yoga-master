import { Outlet } from "react-router-dom"
import { Navbar } from "../components/headers/Navbar"

export const PrimaryLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
        <Navbar />
        <Outlet />
        <footer>Footer</footer>
    </main>
  )
}
