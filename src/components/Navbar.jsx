import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/New Project 1 [2202599].png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo" onClick={handleLinkClick}>
                <img src={logo} alt="Logo" />
            </Link>

            <ul className={open ? "active" : ""}>
                <li>
                    <Link to="/" onClick={handleLinkClick}>Home</Link>
                </li>
                <li>
                    <Link to="/downloads" onClick={handleLinkClick}>Downloads</Link>
                </li>
            </ul>

            <div className="menu-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={open ? faTimes : faBars} color="gold" />
            </div>
        </nav>
    );
}

export default Navbar;
