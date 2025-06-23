import React from "react";
import '../CSS/header.css';
import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="NavigationBar">
                <div className="logo">
                    <Link to="/">SmartCart</Link>
                </div>
                <div className="searchBar">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search for Products"/>    
                </div>
                <div className="rightside">
                    <Link to="/login">
                        <span className="user"><i class="fa-regular fa-user"></i> Sign In</span>
                    </Link>
                    <span className="cart"><i class="fa-brands fa-stack-overflow"></i></span>
                </div>
        </nav>
    );
}

export default Navbar;