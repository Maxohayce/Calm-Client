import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/navbar';

function Layout() {
    return (
        <div className="relative w-full">
            <Navbar />
            <main className="flex flex-col justify-center items-center w-full">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;