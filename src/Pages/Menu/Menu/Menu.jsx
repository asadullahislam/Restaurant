
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';


import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitles/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import './menu.css'



const Menu = () => {

    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const ofered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Boss | Menu</title>
            </Helmet>
            {/* Main Cover  */}


            {/* <Cover img={menuImg} title="Our Menu"></Cover> */}
            <div>
                <img src={menuImg} alt="" />
            </div>

            <SectionTitle subHeading="Don't Miss" heading="Today's offer "></SectionTitle>

            {/* offered menu item */}
            <MenuCategory items={ofered} ></MenuCategory>

            {/* dessert menu items  */}
            <MenuCategory items={desserts} title="desserts" img={dessertImg} ></MenuCategory>
            {/* fizza menu items */}
            <MenuCategory items={pizza} title="pizza" img={pizzaImg} ></MenuCategory>
            {/* salad menu items  */}
            <MenuCategory items={salad} title="salad" img={saladImg} ></MenuCategory>

            {/* soups menu items  */}
            <MenuCategory items={soup} title="soup" img={soupImg} ></MenuCategory>

        </div>
    );
};

export default Menu;