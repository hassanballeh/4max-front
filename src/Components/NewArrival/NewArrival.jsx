import { Link } from 'react-router'
import ArrivalSlider from '../ArrivalSlider/ArrivalSlider';
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const NewArrival = () => {
    return(
        <div className='w-full min-h [782px] bg-white mt-[100px] py-10 px-25 flex items-center justify-center'>
            <div>
                <div className="lg:container mx-auto">
                    <div className="flex items-center justify-between gap-8">

                        <div className="arrival_wrapper">
                        <section id="new-arrivals" className="scroll-mt-24 py-12">
                            <h3 className="text-5xl text-[#484848] font-normal capitalize mb-5">new arrival!</h3></section>

                            <p className='text-base text[#8a8a8a] font-normal mb-10 max-w-[444px]
                            w-full h-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Repellendus laborum perferendis omnis numquam hic laudantium
                                quod inventore ad autem deserunt accusamus possimus
                                ex deleniti alias non, tempora iure reprehenderit dicta!</p>
                                <Link to={'/products'} className='text-base text-white font-poppins
                                font-normal capitalize px-8 py-2.5 bg-black rounded-lg'>buy now</Link>

                                <div className='mt-10'>
                                    <h5 className='text-[27px] text-[#484848] font-poppins font-medium
                                    capitalize mb-4'>hurry, before it's too late!</h5>
                                    <div className='flex items-center justify-between
                                    gap-8 cursor-pointer'>
                                        { /* days box */ }
                                        <div className='days flex flex-col gap-2.5
                                        items-center justify-center'>
                                            <h5 className='w-[76px] h-[76px] rounded-sm
                                            bg-white shadow text-[#484848] text-3xl
                                            font-normal flex items-center justify-center'>02</h5>
                                            <p className='text-[22px] text-[#484848]
                                            font-poppins font-normal capitalize'>days</p>
                                        </div>

                                        { /* hr box */ }
                                        <div className='hr flex flex-col gap-2.5
                                        items-center justify-center'>
                                            <h5 className='w-[76px] h-[76px] rounded-sm
                                            bg-white shadow text-[#484848] text-3xl
                                            font-normal flex items-center justify-center'>06</h5>
                                            <p className='text-[22px] text-[#484848]
                                            font-poppins font-normal capitalize'>hr</p>
                                        </div>
                                        { /* mins box */ }
                                        <div className='mins flex flex-col gap-2.5
                                        items-center justify-center'>
                                            <h5 className='w-[76px] h-[76px] rounded-sm
                                            bg-white shadow text-[#484848] text-3xl
                                            font-normal flex items-center justify-center'>45</h5>
                                            <p className='text-[22px] text-[#484848]
                                            font-poppins font-normal capitalize'>mins</p>
                                        </div>
                                        { /* secs box */ }
                                        <div className='secs flex flex-col gap-2.5
                                        items-center justify-center'>
                                            <h5 className='w-[76px] h-[76px] rounded-sm
                                            bg-white shadow text-[#484848] text-3xl
                                            font-normal flex items-center justify-center'>57</h5>
                                            <p className='text-[22px] text-[#484848]
                                            font-poppins font-normal capitalize'>secs</p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        {/* slider */}
                        <ArrivalSlider/>
                        </div> 

                        { /* icons */ }
                        <div className="w-full pt-[150px] pb-[150px]">
                                    <div className="lg:continer mx-auto">
                                        {/* top wrapper */}
                                        <div className="flex items-center">
                                        </div>

                                        

                                        {/* bottom wrapper */}
                                        <div className="flex items-center justify-between gap-8">
                                            <div className="flex items-center gap-3">
                                                <button><FaHandHoldingHeart size={'2.5rem'} color='black' /></button>
                                                <div>
                                                    <h4 className="text-xl text-[#484848] font-poppins font-medium
                                                    capitalize mb-2">high quality</h4>
                                                    <span className="text-base text-[#484848] font-poppins
                                                    font-normal">crafted from top materials</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button><FaAward size={'2.5rem'} color='black'/></button>
                                                <div>
                                                    <h4 className="text-xl text-[#484848] font-poppins font-medium
                                                    capitalize mb-2">warranty</h4>
                                                    <span className="text-base text-[#484848] font-poppins
                                                    font-normal">over 2 years</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button><FaShippingFast size={'2.5rem'} color='black'/></button>
                                                <div>
                                                    <h4 className="text-xl text-[#484848] font-poppins font-medium
                                                    capitalize mb-2">free shipping</h4>
                                                    <span className="text-base text-[#484848] font-poppins
                                                    font-normal">over 150 $ </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button><IoCall size={'2.5rem'} color='black'/></button>
                                                <div>
                                                    <h4 className="text-xl text-[#484848] font-poppins font-medium
                                                    capitalize mb-2">24/7 support</h4>
                                                    <span className="text-base text-[#484848] font-poppins
                                                    font-normal">dedicated support</span>
                                                </div>
                                            </div>
                                        </div>
                                         </div>
                                         </div> 
                </div>
            </div>
            
        </div>
    );
};

export default NewArrival;

