
const ConfirmationCode = () => {
    return(
        <div className='w-full bg-white py-[70px]'>
            <div className="lg:container mx-auto">
                <div className="flex items-center justify-between gap-10">
                    {/* image wrapper */}
                    <div className='max-w-[940px] w-full min-h=[1077px] h-full'>
                        <img className='w-full h-full object-cover' src="bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" alt="" />
                    </div>

                {/* content wrapper */}
                <div className='max-w-[628px] w-full h-auto'>
                    <h3 className='text-6xl text-[#484848] font-normal uppercase mb-9'>4max</h3>
                    <h4 className='text-3xl font-black font-normal capitalize flex items-center mb-14'>
                        enter the Confirmation Code </h4>
                    <form className='w-full h-auto flex flex-col gap-4.5 items-center'>
                        {/* input box code */}
                        <div className='w-full h-[47px] border-b-[2px] border-[#9d9d9d]'>
                            <input className='w-full h-full border-none outline-0'
                            type="number" placeholder='Confirmation Code' required />
                        </div>


                    </form>
                    <div className="w-full h-auto flex items-center justify-center mt-8
                    gap-4.5">

                    <p className='max-w-[575px] w-full text-black flex
                    items-center gap-3 justify-center'>Didn't recive confirmation code?


                    <button to={'/confirmation-code'} className='text-lg font-poppins font-normal capitalize flex
                    item-center justify-center cursor-pointer text-[#5p86e5] underline'
                    >resend now</button></p>

                    </div> 
                </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationCode;