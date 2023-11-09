import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {

    const menu = <>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/forms">Forms</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/responses/1">Responses</NavLink></li>

        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/supports">Supports</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 rounded-full ">
            <div className="navbar-start">
                <div className="dropdown z-[999]">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 lg:hidden">
                        {menu}
                    </ul>
                </div>
                <Link to='/' className='flex'>
                    <img src="/logo.png" height="40" width="40" alt="" />
                    <p className='font-bold text-2xl text-[#1b2ec2]'>Formulator<span className='text-[#ff60f4]'>X</span></p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end z-[999]">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://i.ibb.co/d6fJ2xS/channels4-profile.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;