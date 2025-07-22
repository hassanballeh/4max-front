import { Link } from 'react-router-dom';

const DefaultNavbar = () => {
    return (
        <div className='w-full bg-gray-100'>
            <div className="lg:container w-full mx-auto px-25">
                <div className="flex items-center justify-between">
                    {/* logo wrapper */}
                    <div className="logo_wrapper">
                        <Link to="/"><h3 className='text-[3.5rem] text-[#484848] uppercase font-normal'>4max</h3></Link>
                    </div>

                    {/* icons */}
                    <div className="text-base text-[#484848] font-poppins">
                        Welcome to 4max
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultNavbar;
