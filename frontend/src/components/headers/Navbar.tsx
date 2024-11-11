import { useState } from 'react';
import logo from '../../assets/welcome/logo.jpg';
import { NavLink } from 'react-router-dom';

const navLinks = [
    { name: "Home", route: "/" },
    { name: "Instructors", route: "/instructors" },
    { name: "Classes", route: "/classes" }
];

export const Navbar = () => {
    const [navBg, setNavBg] = useState("bg-[#15151580")
    return (
        <nav>
            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className='px-4 py-4 flex items-center justify-center'>
                    {/* logo */}
                    <div>
                        <h1 className='text-2xl inline-flex gap-3 items-center font-bold'>YogaMaster
                            <img src={logo} alt="YogaMaster Logo" className="w-8 h-8" />
                        </h1>
                        <p className="font-bold text-[13px] tracking-[3px]">Improve  on  yesterday</p>
                    </div>

                    {/* mobile menue icons */}
                    {/* navigational links */}
                    <div className='hidden md:block text-black dark:text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={link.route}
                                            className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' :
                                                    `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-30`
                                            }>
                                            {link.name}</NavLink>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
