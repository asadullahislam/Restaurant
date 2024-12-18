import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../../Hooks/useCart";

import { useContext } from "react";
import useAdmin from "../../../../Hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li className="font-bold text-xl hover:shadow-lg text-black">
        <Link to="/">Home</Link>
      </li>
      <li className="font-bold text-xl text-black">
        <Link to="/menu">Our Menu</Link>
      </li>
      <li className="font-bold text-xl text-black">
        <Link to="/order/salad">Order Food</Link>
      </li>
      <li className="font-bold text-xl text-black">
        <Link to="/contactUs">ContactUs</Link>
      </li>
      {/* add after when problem then removed */}
      {/* {
            // user ? 'true': 'false'
            // user ? condition ? 'double true' : 'one true' : 'false'
        } */}
      {user && isAdmin && (
        <li className="font-bold text-xl text-black">
          <Link to="/dashboard/adminHome">Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li className="font-bold text-xl text-black">
          <Link to="/dashboard/userHome">Dashboard</Link>
        </li>
      )}
      <li className="font-bold text-xl text-black">
        <Link to="/dashboard/cart">
          <button className="btn">
            <FaShoppingCart className="mr-2"></FaShoppingCart>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>
      {user ? (
        <>
          {/* <span>{user?.displayName}</span> */}
          <button
            onClick={handleLogOut}
            className="btn btn-outline btn-warning text-black font-bold text-xl "
          >
            LogOut
          </button>
        </>
      ) : (
        <>
          <li className="btn btn-outline btn-success text-black font-bold text-xl">
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar  w-full z-10  max-w-screen-xl bg-beige text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black  rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn text-black  font-bold text-5xl">Easy Foods</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
