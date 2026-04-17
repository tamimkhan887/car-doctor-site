import React, { useContext } from 'react';
import { Link, Links } from 'react-router-dom';
import logo from "../assets/logo.svg"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { AuthContext } from '../ContextProvider/ContextContainer';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () =>{
        logOut()
        .then(()=>{
            alert("Log Out Successful")
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const navLinks = <>
        <li><Link to='/' className='font-semibold text-lg text-[#444444]'>Home</Link></li>
        <li><Link to='/services' className='font-semibold text-lg text-[#444444]'>Services</Link></li>
        {
            user?.email ? <button onClick={handleLogOut} className=' btn btn-ghost font-semibold text-lg text-[#444444]'>Log Out</button> : <div className='flex justify-between items-center'>
                <li><Link to='/register' className='font-semibold text-lg text-[#444444]'>Register</Link></li>
                <li><Link to='/login' className='font-semibold text-lg text-[#444444]'>Log In</Link></li>
            </div>
        }
    </>
    return (
        <div className="navbar mt-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <Link to="/">
                    <img className='w-20 md:w-auto' src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navLinks
                    }
                </ul>
            </div>
            <div className="navbar-end gap-4 md:gap-8">
                <div className='flex gap-2 md:gap-4 items-center justify-between' >
                    <Link to={"/cart"}><HiOutlineShoppingBag size={24} color='#444444' /></Link>
                    <GoSearch size={24} color='#444444' />
                </div>
                <a className="text-[#FF3811] border-2 border-[#FF3811] rounded-lg px-3 md:px-6 py-1 md:py-2 font-semibold text-sm md:text-lg" >Appointment</a>
            </div>
        </div>
    );
};

export default Navbar;