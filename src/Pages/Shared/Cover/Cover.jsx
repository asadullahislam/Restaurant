import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {
    return (

        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="The Memu"
            strength={-200}
            className='w-100 h-100'
        >
            <div className="hero h-[700px]">
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase ">{title}</h1>
                        <p className="mb-5">In less than 5 minutes you could unlock low-cost food ordering and delivery for your business. There are no strings attached and you can cancel at any time.</p>
                        <button className="btn btn-primary">Order Now</button>
                    </div>
                </div>
            </div>
        </Parallax>



    );
};

export default Cover;