import React from 'react';
import { Link, NavLink } from 'react-router';

const Footer = () => {
    return (
        <div className='w-full bg-white pt-[30px] pb-[20px] border-t-[1px] border-[#d9d9d9]'>
            <div className="lg:container mx-auto">
                <div className="flex items-center justify-between px-25 pb-6">
                    {/* logo wrapper */}
                    <div className="logo_wrapper">
                        <Link to={'/'}><h3 className='text-[2.5rem] text-[#484848] uppercase
                        font-normal'>4max</h3></Link>
                    </div>

                    {/* navbar wrapper */}
                    <div>
                       <nav className='flex items-center gap-[1.5rem]'>
						<NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>support center</NavLink>
						<NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>invoicing</NavLink>
						<NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>contact</NavLink>
						<NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>career</NavLink>
						<NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>blog</NavLink>
                        <NavLink to={'/'} className='text-base text-[#484848] capitalize font-normal font-poppins'>FAQs</NavLink>
					</nav>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <p className='text-sm text-[#484848] font-poppins font-normal'>Copyright &copy;
                20250 formax. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;