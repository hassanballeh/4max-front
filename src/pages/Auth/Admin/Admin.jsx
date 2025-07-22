import React from 'react';
import { Link } from 'react-router';

const Admin = () => {
    return (
        <div className='w-full bg-white py-[70px]'>
            <div className="lg:container mx-auto">
                <div className="flex items-center justify-between gap-10">
                    {/* image wrapper */}
                    <div className='max-w-[940px] w-full min-h=[1077px] h-full'>
                        <img className='w-full h-full object-cover' src="bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" alt="login image" />
                    </div>
                {/* content wrapper */}
                <div className='max-w-[628px] w-full h-auto'>
                    <h4 className='text-3xl font-black font-normal capitalize flex items-center mb-14'>
                        Hello Admin, please sign in here..</h4>
                    <form className='w-full h-auto flex flex-col gap-4.5 items-center'>
                        {/* input box email */}
                        <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                            <input className='w-full h-full border-none outline-0'
                            type="text" placeholder='Enter your Name...' required />
                        </div>
                        {/* input box password */}
                        <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                            <input className='w-full h-full border-none outline-0'
                            type="password" placeholder='Enter your password...' required />
                        </div>

                        <div className="w-full h-auto flex items-center justify-center" type='submit'>
                        <button className="max-w-[575px] w-full h-[60px] bg-black rounded-lg
                        text-white text-xl font-poppins font-semibold capitalize flex
                        items-center justify-center cursor-pointer mt-6" type="submit">sign in</button>
                    </div>

                    </form>
                    <div className="w-full h-auto flex items-center justify-center mt-8
                    gap-4.5">            
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;