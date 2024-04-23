"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface TabProps {
    tabs: {
        label: string;
        href: string;
        // isActive?: boolean;
        isDisabled?: boolean;
    }[];
}

function Tab(props: TabProps) {
    const pathname = usePathname();
    return (
        <>
            <div className="text-sm font-medium text-center text-gray-400 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px">
                    {/* <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Profile</a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active " aria-current="page">Dashboard</a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">Settings</a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Contacts</a>
                    </li> */}

                    {props.tabs.map((tab, index) => (
                        <li key={index} className={`me-2 ${tab.isDisabled ? 'cursor-not-allowed' : ''}`}>
                            {/* <a
                                href={tab.href}
                                className={`inline-block p-4 ${pathname === tab.href ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active' : 'border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'
                                    }`}
                                // aria-current={tab.isActive ? 'page' : undefined}
                                aria-current={pathname === tab.href  ? 'page' : undefined}
                                // aria-current={router.pathname === tab.href ? 'page' : undefined}
                                disabled={tab.isDisabled}
                            >
                                {tab.label}
                            </a> */}
                            <Link
                                href={tab.href}
                                className={`inline-block p-4 ${pathname === tab.href ? 'text-text-200 border-b-2 border-text-200 rounded-t-lg active' : 'border-b-2 border-transparent rounded-t-lg hover:text-gray-400 hover:border-gray-400'
                                    }`}
                                aria-current={pathname === tab.href ? 'page' : undefined}
                                // disabled={tab.isDisabled}
                            >
                                {tab.label}
                            </Link>
                        </li>
                    ))}


                    {/* for disabled tab */}
                    {/* <li>
                        <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed">Disabled</a>
                    </li> */}
                </ul>
            </div>

        </>
    )
}

export default Tab