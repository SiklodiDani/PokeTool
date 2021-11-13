import React from "react";
import { useHistory, Link } from "react-router-dom";

const Navbar = () => {

    const history = useHistory();

    const handleHistory = () => {
        history.push("/");
    }

    return (
        <div style={{backgroundColor: "rgb(51, 142, 247)"}} >
            <nav >
                <Link to="/">
                    <h1 style={{ textAlign: "left" ,color: "white", margin:"0",  paddingBottom: "5px", paddingLeft: "5px"}} onClick={handleHistory}>Poképedia</h1>
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;