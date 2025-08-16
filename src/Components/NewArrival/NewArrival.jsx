import { Link } from 'react-router-dom';
import ArrivalSlider from '../ArrivalSlider/ArrivalSlider';
import { FaHandHoldingHeart, FaAward, FaShippingFast } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const NewArrival = () => {
  return (
    <div className="w-full border-b border-[#d9d9d9] bg-white mt-24 py-16 px-4 md:px-12 xl:px-20">
      <div className="max-w-7xl w-full mx-auto">

<div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 text-center md:text-left">
  
  <div className="w-full px-10 sm:px-10 md:w-1/2 flex flex-col items-center md:items-start mb-1 pl-12">
    <section id="new-arrivals" className="scroll-mt-24 mb-6">
      <h3 className="text-3xl md:text-5xl text-[#484848] font-semibold capitalize mt-4">
        New Arrival!
      </h3>
    </section>

    <p className="text-base text-[#8a8a8a] mb-8 max-w-[444px]">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus laborum perferendis omnis numquam hic laudantium quod inventore ad autem deserunt.
    </p>

    <Link
      to="/products"
      className="text-base text-white capitalize px-6 py-2.5 bg-black rounded-lg"
    >
      Buy Now
    </Link>

    {/* Countdown Timer */}
    <div className="mt-10">
      <h5 className="text-2xl text-[#484848] font-medium capitalize mb-4">
        Hurry, before it's too late!
      </h5>
      <div className="grid grid-cols-4 gap-6">
        {['02', '06', '45', '57'].map((val, i) => {
          const labels = ['Days', 'Hr', 'Mins', 'Secs'];
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white shadow rounded-sm flex items-center justify-center text-2xl text-[#484848]">
                {val}
              </div>
              <p className="text-lg text-[#484848] capitalize mt-2">
                {labels[i]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </div>


  <div className="w-full md:w-1/2">
    <ArrivalSlider />
  </div>
</div>

{/* Icons Section */}
<div className="mt-40 pl-10 lg:pl-15 lg:pr-4">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-50">
    {[
      {
        icon: <FaHandHoldingHeart size="2rem" />,
        title: "High Quality",
        subtitle: "Crafted from top materials"
      },
      {
        icon: <FaAward size="2rem" />,
        title: "Warranty",
        subtitle: "Over 2 years"
      },
      {
        icon: <FaShippingFast size="2rem" />,
        title: "Free Shipping",
        subtitle: "Over $150"
      },
      {
        icon: <IoCall size="2rem" />,
        title: "24/7 Support",
        subtitle: "Dedicated support"
      },
    ].map((item, idx) => (
      <div key={idx} className="flex items-start gap-3">
        <div>{item.icon}</div>
        <div>
          <h4 className="text-lg text-[#484848] font-medium capitalize mb-1">
            {item.title}
          </h4>
          <span className="text-sm text-[#484848]">
            {item.subtitle}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>


      </div>
    </div>
  );
};

export default NewArrival;
