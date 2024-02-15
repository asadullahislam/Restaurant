import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import FeaturedImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed pt-8 my-20 ">
            <SectionTitle
                heading="check it out"
                subHeading=" Featured Item"
            ></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-12 bg-slate-500 bg-opacity-60  px-36">
                <div >
                    <img src={FeaturedImg} alt="" />
                </div>
                <div className="md:ml-10 text-white">
                    <p>Aug 20, 2020</p>
                    <p className="upercase">Where can i get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae numquam similique odit earum illo? Voluptatem, officia placeat ab sint, quae nesciunt deserunt in, a cum at consequuntur error magni perspiciatis?</p>
                    <button className="btn text-2xl btn-outline border-0 border-b-4 mt-4">Order Now </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;