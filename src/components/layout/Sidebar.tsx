"use client"
import React, { useState, useEffect} from 'react'
import { useAppSelector } from "@/lib/hook";

const Sidebar = () => {
    const isSidebarOpened =  useAppSelector(state=> state.ui.sidebarOpen)
    const [isSidebarOpen, setIsSidebarOpen] = useState(isSidebarOpened)

    useEffect(() => {
        setIsSidebarOpen(isSidebarOpened);
    }, [isSidebarOpened]);

    return (
        <>
            <aside className={`fixed w-60 h-full  transition-transform  ${isSidebarOpen ? '' : '-translate-x-full'} sm:translate-x-0`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a href="#" className="flex items-center ps-2.5 mb-5">
                        <img src="" className="h-6 me-3 sm:h-7" alt="Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">DBS</span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {/* put maybe icons here */}
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>



        </>
    )
}

export default Sidebar;