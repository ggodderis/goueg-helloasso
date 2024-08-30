import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {

    const {nav} = props;

    // window.scrollTo({ top: 50, behavior: 'smooth' });

    return(
        <>
        <nav>
            {
                nav.map( (item,i) => (
                    <Link key={i} to={item.to} className='link_chemin'>{item.label}</Link>
                ) )
            }
            {/* <Link key="1" to="/">Home</Link>
            <Link key="2" to="/formulaire">Formulaire</Link>
            <Link key="4" to="/cotisation">Cotisation</Link>
            <Link key="5" to="/licence">Licence</Link> */}
        </nav>
        </>
    )

}
export default Header;
