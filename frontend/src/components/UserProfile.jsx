import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function UserProfile() {
  return (
    <>

        <Navbar></Navbar>

        <div className='bg-gray-100 flex flex-col justify-center items-center p-35'>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-3xl font-bold m-2.5'>Profile Information</p>
                <p className='text-gray-500'>Manage your personal information</p>
                <div className='w-45 h-45 rounded-full mt-10 overflow-hidden'>
                    <img src="../../public/images/loginpage_photo.jpg" className='w-full h-full object-cover'></img>
                </div>
                <button className='mt-5 bg-gray-200 p-2 text-gray-500 rounded-sm'><i class="fa-solid fa-pen"></i> Edit Photo</button>
            </div>

            <div className='flex items-center justify-between m-3 bg-white w-3xl p-5 rounded-2xl shadow-md'>
                
                <div className='flex justify-between flex-col'>
                    <p className='font-bold text-gray-600'>Full Name</p>
                    <p className='text-gray-500'>John Doe</p>
                </div>
                <button className='text-gray-500'><i class="fa-solid fa-pen"></i></button>
            </div>

            <div className='flex items-center justify-between m-3 bg-white w-3xl p-5 rounded-2xl shadow-md'>
                
                <div className='flex justify-between flex-col'>
                    <p className='font-bold text-gray-600'>Email Address</p>
                    <p className='text-gray-500'>johndoe@gmail.com</p>
                </div>
                <button className='text-gray-500'><i class="fa-solid fa-pen"></i></button>
            </div>

            <div className='flex items-center justify-between m-3 bg-white w-3xl p-5 rounded-2xl shadow-md'>
                
                <div className='flex justify-between flex-col'>
                    <p className='font-bold text-gray-600'>Phone Number</p>
                    <p className='text-gray-500'>9087654321</p>
                </div>
                <button className='text-gray-500'><i class="fa-solid fa-pen"></i></button>
            </div>

            <div className='flex items-center justify-between m-3 bg-white w-3xl p-5 rounded-2xl shadow-md'>
                
                <div className='flex justify-between flex-col'>
                    <p className='font-bold text-gray-600'>Address</p>
                    <p className='text-gray-500'>28 Kilo, KU Gate</p>
                </div>
                <button className='text-gray-500'><i class="fa-solid fa-pen"></i></button>
            </div>

            
        </div>
                    
            
        <Footer/>
         
    </>
  )
}

export default UserProfile