import React, { useState } from 'react'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { href, Link } from 'react-router'
import avatarImg from "../assets/avatar.png"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';


const navigation = [
    {name:"Dashboard", href:"/dashboard"},
    {name:"Orders", href:"/orders"},
    {name:"Cart Page", href:"/cart"},
    {name:"Check out", href:"/checkout"},
]


const Navbar = () => {

    const [isDropdownOpen, setisDropdownOpen] = useState(false);

    const cartItems = useSelector((state)=> state.cart.cartItems);
 
    console.log(isDropdownOpen)

    const {currentUser, logOut} = useAuth()

    const handleLogOut = () => {
        logOut()
    }
    
  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
        <nav className='flex justify-between items-center'>

            {/* left side */}
        <div className='flex items-center md:gap-16 gap-4'>
            <Link to="/">
            <HiMiniBars3CenterLeft className='size-6' />
            </Link>

            {/* seacrh input */}
            <div className='relative sm:w-72 w-40 space-x-2'>
                <IoIosSearch className='absolute inline-block left-3 inset-y-2'/>
                <input type="text" placeholder='Search here'className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'  />
            </div>
        </div>


        {/* right side */}
        <div className='relative flex items-center justify-center md:space-x-3 space-x-2  ml-auto'>
            <div>
                {
                    currentUser? <>
                    <button onClick={ ()=> setisDropdownOpen(!isDropdownOpen)}>
                        <img src= {avatarImg} alt="" className={`size-7 rounded-full ${currentUser ?'ring-2 ring-blue-500':'' }`}/>
                        </button>
                        {/* show drop down */}
                        {
                            isDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                    <ul className='py-2'>
                                         {
                            navigation.map((item) =>(
                              <li key={item.name} onClick={()=> setisDropdownOpen(false)}>
                                <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                {item.name}
                                </Link>
                              </li>
                            ))

                        }
                        <li>
                            <button
                            onClick={handleLogOut}
                             className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>Logout</button>
                        </li>
                                    </ul>
                                </div>
                            )
                        }
                       
                        </> :  <Link to="/login"><FaUser className='size-6' /></Link>
                }
            </div>
            <button className='hidden sm:block'>
             <FaHeart className='size-6'/>
            </button>

            <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
            <MdOutlineShoppingCart className='size-5' />
            {
                cartItems.length > 0 ? <span className='text-sm front-semibold sm:ml-1' >{cartItems.length}</span> :  <span className='text-sm front-semibold sm:ml-1' >0</span>
            }

            </Link>

        </div>

        </nav>

    </header>
  )
}

export default Navbar
