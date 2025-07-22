import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="w-full pt-[90px]">
            <div className="lg:container mx-auto">
                <div className="flex items-center justfly-between gap-6 min-h-
                [756px] h-full">
                    {/* left size */}
                    <div className="max-w-1/3 w-full min-h-[756px] h-full bg
                    [#e0e0e0] rounded-lg flex item-end justfy-center pl-25">
                        <img src="bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" alt=""/>
                    </div>

                    {/* middle size */}
                    <div className=" max-w-1/3 flex flex-col item-baseline
                    justify-between">
                    

                    <div className="text-center">
                        <h3 className="text-[#484848] text-[91px]
                        font-poppins font-medium uppercase">ultimate <br />
                        <span className="text-white text-stroke text-[145px]">
                        sale</span></h3>
                        <p className="text-[#484848] text-xl font-normal
                        font-poppins uppercase mb-5">new collection</p>   
                    </div>
                    <Link to="/products" className="w-fit mx-auto text-white font-poppins font-medium px-6 py-2
                    bg-black rounded text-sm uppercase mb-4 inline-block">Shop now</Link>


                    
                    </div>
                    {/* right size */}
                    <div className="max-w-1/3 w-full min-h-[756px] h-full rounded-lg flex item-end justfy-center pr-25">
                        <img src="bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;