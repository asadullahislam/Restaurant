import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBar from '../Pages/Shared/Footer/NavBar/NavBar';

const Main = () => {

    const loaction = useLocation();
    const noHeaderFooter = loaction.pathname.includes('login')

    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;