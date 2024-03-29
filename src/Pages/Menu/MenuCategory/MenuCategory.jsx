import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            <div>
                {title &&
                    <div>
                        <img src={img} title={title} alt="" />
                    </div>
                }

            </div>

            <div className='grid md:grid-cols-2 gap-8 my-16'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}

                    ></MenuItem>)
                }
            </div>
            <div className="text-center">
                <Link to={`/order/${title}`}><button className="btn text-2xl btn-outline border-0 border-b-4 mt-4 ">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;