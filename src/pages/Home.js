import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {

    const {user,nouveau} = props;


    return(
        <>
        <h1>Adhésion au club</h1>
        {
            user.firstName ? (
                <>
                <span>Bonjour, {user.firstName} {user.lastName}</span>
                <br />
                {
                    nouveau == 'adherent' ? (
                        <Link key="1" to="/cotisation" className='bt_bleu'>Commencer mon adhésion</Link>
                    ):(
                        <Link key="1" to="/formulaire" className='bt_bleu'>Commencer mon adhésion</Link>
                    )
                }
                <br />
                <a href={"/wp-login.php?action=logout&_wpnonce="+the_ajax_script.logoutNonce+"&redirect_to=page-d-exemple"}>
                    Me connecter avec un autre compte
                </a>
                </>
            ):(
                <div className='content_start'>

                    <div>
                        <h2 className='titre_adhesion'>Je suis déjà adhérent</h2>
                        <a href="/member-login?redirect_to=page-d-exemple" className='bt_bleu'>Je m'indentifie</a>
                    </div>

                    <div>
                        <h2 className='titre_adhesion'>Je suis nouveau...</h2>
                        <Link key="2" to="/formulaire" className='bt_bleu_outline'>Je crée un compte</Link>
                    </div>

                </div>
            )
        }
        
        </>
    )
}
export default Home;