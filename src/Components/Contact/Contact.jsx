import React from "react";

const Contact = () => {
  const followers = [
    { id: 1, image: "instagramPhoto/photo_2_2025-07-30_16-40-44.jpg" },
    { id: 2, image: "instagramPhoto/photo_8_2025-07-30_16-40-44.jpg" },
    { id: 3, image: "instagramPhoto/photo_7_2025-07-30_16-40-44.jpg" },
    { id: 4, image: "instagramPhoto/photo_6_2025-07-30_16-40-44.jpg" },
    { id: 5, image: "instagramPhoto/photo_4_2025-07-30_16-40-44.jpg" },
    { id: 6, image: "instagramPhoto/photo_5_2025-07-30_16-40-44.jpg" },
    { id: 7, image: "instagramPhoto/photo_3_2025-07-30_16-40-44.jpg" },
  ];

  return (
    <div className="w-full flex flex-col items-center mb-20 pt-24 px-4">
      <section id="contact" className="scroll-mt-24 mb-6">
        <h3 className="text-3xl md:text-5xl text-[#484848] font-semibold text-center capitalize">
          Follow us on Instagram
        </h3>
      </section>

      <p className="text-base text-[#8a8a8a] text-center max-w-3xl mb-12">
      Don’t miss out on our latest arrivals, special deals, and exclusive offers! Follow us on Instagram @4max to stay updated, get inspired by our style tips, and be the first to know about upcoming sales. Join our community today and shop smarter with us!.{" "}
      </p>

      <div className="flex items-center px-0 lg:px-38">
        {followers.map((follower) => (
          <div key={follower.id} className="overflow-hidden">
            <img
              src={follower.image}
              alt={`Instagram ${follower.id}`}
              className="w-100 h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
