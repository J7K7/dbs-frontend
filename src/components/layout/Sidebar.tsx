"use client"
import React, { useState, useEffect} from 'react'
import { useAppSelector } from "@/lib/hook";
import Link from 'next/link';

const Sidebar = () => {
    const isSidebarOpened =  useAppSelector(state=> state.ui.sidebarOpen)
    const [isSidebarOpen, setIsSidebarOpen] = useState(isSidebarOpened)

    useEffect(() => {
        setIsSidebarOpen(isSidebarOpened);
    }, [isSidebarOpened]);

    return (
        <>
            <aside className={`mt-16 fixed left-0 h-screen w-64 z-20  transition-transform  ${isSidebarOpen ? '' : '-translate-x-full'} sm:translate-x-0`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-accent-300 text-text-100">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/dashboard" className="flex items-center p-2 text-bkg-100 rounded-lg  hover:bg-accent-100 hover:text-text-200  group">
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/product" className="flex items-center p-2 text-bkg-100 rounded-lg  hover:bg-accent-100 hover:text-text-200">
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>



        </>
    )
}

export default Sidebar;
