import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Sidebar = ({ match }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to sign out?") === true) {
            dispatch(logout({}));
        }
    };

    const styleButton = {
        fontSize: "0.9rem",
        backgroundColor: "#027581",
        border: "none",
        color: "#ffffff",
        cursor: "pointer",
    };

    const styleSapn = {
        marginRight: "10px",
    };

    return (
        <>
            <input type='checkbox' id='sidebar-toggle' />
            <div className='sidebar'>
                <div className='sidebar-menu'>
                    <ul>
                        <li>
                            <NavLink exact to={`${match.url}`} activeClassName='selected'>
                                <span className='ti-home'></span>
                                <span>Overview</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${match.url}/orders`} activeClassName='selected'>
                                <span className='ti-shopping-cart-full'></span>
                                <span>Orders</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${match.url}/users`} activeClassName='selected'>
                                <span className='ti-user'></span>
                                <span>Users</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={`${match.url}/products`} activeClassName='selected'>
                                <span className='ti-layout-grid3'></span>
                                <span>Products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${match.url}/profile`} activeClassName='selected'>
                                <span className='ti-book'></span>
                                <span>Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} style={styleButton}>
                                <span className='ti-shift-right-alt' style={styleSapn}></span>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
