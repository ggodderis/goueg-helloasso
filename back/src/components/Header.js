import { React, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <div className="header_back">
            <NavLink to="/adhesions" className={({ isActive }) => (isActive ? 'active' : 'link_menu')}>Adhesions</NavLink>
            <NavLink to="/tarifs" className={({ isActive }) => (isActive ? 'active' : 'link_menu')}>Tarifs</NavLink>
            
        </div>
        )
}
export default Header;