"use client"
import React, { useState, useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSideBar } from "@/lib/features/ui/uiSlice";
import { useAppDispatch} from "@/lib/hook";
import { SimpleButton } from '../ui/Buttons';
import logoutController from '@/utils/logoutController';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const dispatch = useAppDispatch()

    const [isDropdownOpen,  setIsDropdownOpen] = useState(false)
    const  dropdownRef = useRef<HTMLDivElement>(null);
    const  userBtnRef =  useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }
    const router = useRouter();

    useEffect   (()=>{
        let handler = (e : MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && !userBtnRef.current?.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener('mousedown', handler);
          };
    })

    return (
        <>
            <nav className="fixed top-0 left-0 w-full shadow-md z-10 bg-accent-300 text-bkg-100"> 
            {/* flex flex-wrap items-center justify-between mx-auto p-4 */}
                <div className="flex items-center justify-between mx-auto p-4">
                    <button className="inline-flex items-center p-1   rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 "
                    onClick={()=> dispatch(toggleSideBar())} 
                    >
                        {/*hamburger svg here */}
                        <MenuIcon />
                    </button>
                    <div>
                        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="" className="h-6 me-3 sm:h-7" alt="Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap ">DBS</span>
                        </a>
                    </div>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                        onClick={toggleDropdown}
                        ref={userBtnRef}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
                            
                        </button>
                        {/* dropdown menu */}
                        <div 
                            className={`z-50 ${isDropdownOpen  ? `block` : `hidden`} absolute right-2 top-16 text-base list-none bg-accent-200 divide-y divide-gray-100 rounded-lg shadow`}
                            ref={dropdownRef}
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-text-200">Bonnie Green</span>
                                <span className="block text-sm  text-text-100 truncate ">name@flowbite.com</span>
                            </div>
                            <ul className="py-2">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-text-200 hover:bg-gray-100">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-text-200  hover:bg-gray-100">Settings</a>
                                </li>
                                <li>
                                    {/* <a href="#" className="block px-4 py-2 text-sm text-text-200  hover:bg-gray-100">Earnings</a> */}
                                    <Link className="block px-4 py-2 text-sm text-text-200  hover:bg-gray-100" href='/profile'>Profile</Link>
                                </li>
                                <li>
                                    {/* <a href="#" className="block px-4 py-2 text-sm text-text-200  
                                    hover:bg-gray-100">Log out</a> */}
                                    <SimpleButton 
                                        name='logout'
                                        onClick={() => logoutController(dispatch, router)}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar