import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav>
                <NavLink to="/">
                    <h1>Poképedia</h1>
                </NavLink>
            </nav>
        </div>
    );
};

export default Navbar;