import { images } from "../utils/mockData.js";

const MenuSection = () => {

    const duplicatedImages = [...images, ...images, ...images, ...images];

    return (
        <div className="pb-12">
            <div className="ml-40 text-xl mt-4 mb-6">
                <h2 className="font-bold text-gray-800 tracking-wide">What's on your mind?</h2>
            </div>
            
            <div className="overflow-hidden relative ml-55 mr-55 mask-[linear-gradient(to_right,transparent,#000_10%_90%,transparent)] ">
                <div 
                    className="flex animate-scroll"
                    style={{
                        width: `${duplicatedImages.length * 176}px`,
                    }}
                >
                    {duplicatedImages.map((imgUrl, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 mx-4 bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl"
                        >
                            <img 
                                src={imgUrl} 
                                alt={`Food item ${(index % images.length) + 1}`}
                                className="w-36 h-45 object-cover block rounded-2xl" 
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(${-images.length * 176}px);
                    }
                }
                
                .animate-scroll {
                    animation: scroll-left 25s linear infinite;
                    will-change: transform;
                }
                
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

export default MenuSection;