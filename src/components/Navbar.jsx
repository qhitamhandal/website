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

    return (
        <nav className="navbar">
            <a href="#" className="logo">
                <img src={logo} alt="Logo" />
            </a>

            <ul className={open ? "active" : ""}>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Server</a>
                </li>
                <li>
                    <a href="#">Project</a>
                </li>
            </ul>

            <div className="menu-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={open ? faTimes : faBars} color="gold" />
            </div>
        </nav>
    );
}

export default Navbar;
