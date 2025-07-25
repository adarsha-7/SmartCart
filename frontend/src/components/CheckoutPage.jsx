import React from 'react'
import Footer from './Footer'
function CheckoutPage() {
  return (
    <>
        <div className='border-2 border-gray-200 rounded-md p-2.5 m-5 w-4xl mb-50 flex '>
            <form>
                <div className='flex flex-col h-200 justify-between w-220'>
                    <p className='font-bold text-2xl'>Shipping Details</p>
                    
                    <div className='flex space-x-3 m-2'>
                        <div className='flex flex-col flex-1'>
                            <label for="fname" className='font-bold'>First Name</label>
                            <input type="text" id="fname" placeholder="Jon" requried className='border border-gray-400 w-full rounded-md p-1 focus:border-gray-500 outline-none'></input>
                        </div>

                        <div className='flex flex-col flex-1'>
                            <label for="lname" className='font-bold'>Last Name</label>
                            <input type="text" id="lname" placeholder="Doe" requried className='border border-gray-400 w-full rounded-md p-1 focus:border-gray-500 outline-none'></input>
                        </div>
                    </div>

                    <div className='flex flex-col m-2'>
                        <label for="email" className='font-bold'>Email</label>
                        <input type="email" id="email" placeholder="johndoe@gmail.com" required className='border border-gray-400 w-full rounded-md p-1 focus:border-gray-500 outline-none'></input>
                    </div>

                    <div className='flex flex-col m-2'>
                        <label for="phoneno" className='font-bold'>Phone Number</label>
                        <input type="text" id="phoneno" placeholder="9087654321" requried className='border border-gray-400 w-full rounded-md p-1 focus:border-gray-500 outline-none'></input>
                    </div>

                    <div className='flex flex-col m-2'>
                        <label for="address" className='font-bold'>Address</label>
                        <input type="text" id="address" placeholder="Namaste Marga, Baneshwor, Kathmandu" requried className='border border-gray-400 w-full rounded-md p-1 focus:border-gray-500 outline-none'></input>
                    </div>

                    <div className='m-2 space-x-2 flex justify-center items-center'>
                        <input type="checkbox" id="checkbox"></input>
                        <label for="checkbox">Save this address for future orders</label>
                    </div>

                    <div className='flex justify-center items-center'>
                        <button className='bg-black text-white p-4 w-35 rounded-2xl hover:cursor-pointer'>Confirm</button>
                    </div>
                </div>
                
            </form>
        </div>
        <Footer/>
    </>
  )
}

export default CheckoutPage