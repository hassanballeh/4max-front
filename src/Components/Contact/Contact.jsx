

const Contact = () => {

    const followers = [
        {
        id: 1,
        image: 'instagramPhoto/photo_2_2025-07-30_16-40-44.jpg' ,
        width: '320',
        height: '308',
    },
    {
        id: 2,
        image: 'instagramPhoto/photo_8_2025-07-30_16-40-44.jpg',
        width: '320',
        height: '308',
    },
    {
        id: 3,
        image: 'instagramPhoto/photo_7_2025-07-30_16-40-44.jpg ',
        width: '320',
        height: '308',
    },
    {
        id: 4,
        image: 'instagramPhoto/photo_6_2025-07-30_16-40-44.jpg',
        width: '320',
        height: '308',
    },
    {
        id: 5,
        image: 'instagramPhoto/photo_4_2025-07-30_16-40-44.jpg',
        width: '320',
        height: '308',
    },
    {
        id: 6,
        image: 'instagramPhoto/photo_5_2025-07-30_16-40-44.jpg',
        width: '320',
        height: '308',
    },
    {
        id: 7,
        image: 'instagramPhoto/photo_3_2025-07-30_16-40-44.jpg',
        width: '320',
        height: '308',
    },
]
    return( 
                        <div className="w-full flex flex-col items-center mb-[80px] pt-[100px]">
                        <section id="contact" className="scroll-mt-24 py-12">
                            <h3 className="text-5xl text-[#484848] font-normal capitalize ">
                               Follow us on instagram </h3></section>
                               <p className="text-base text-[#8a8a8a] font-poppins font-normal max-w-[800px] w-full mb-15 block text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi numquam perspiciatis veniam laudantium eligendi.
                                Consequatur eaque vero officia atque voluptatum nulla harum? Quam dolorum sunt nesciunt voluptatum nulla harum? Quam dolorum sunt nesciunt.</p>

                                <div className="flex items-center px-25" >
                                {
                followers?.map((follower) => (
                    <div key={follower?.id} className={`min-h-[${follower?.height}px] h-full w-[${follower?.width}px] w-full`}>
                        <img className="w-full hyrsd-full object-cover" src={follower?.image} alt="" />
                    </div>
                ))
            }
            </div>
                                

                                                     
            </div>
            
    );
};

export default Contact ;