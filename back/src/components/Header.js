import { React, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <div>
            <NavLink to="/tarifs" className="" >Tarifs</NavLink>
        </div>
        )
}
export default Header;