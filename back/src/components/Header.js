import { React, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <div className="header_back">
            <NavLink to="/tarifs" className="link_menu" >Tarifs</NavLink>
            <NavLink to="/adhesions" className="link_menu" >Adhesions</NavLink>
        </div>
        )
}
export default Header;