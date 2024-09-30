import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {

    const {user,nouveau} = props;


    return(
        <>
        {
            user.firstName ? (
                <>
                <div className="bandeau_haut">
                    <span className="bandeau_haut_titre">Bonjour, <b>{user.firstName} {user.lastName}</b></span>
                    <a className="hello_deconnexion" href={"/wp-login.php?action=logout&_wpnonce="+the_ajax_script.logoutNonce+"&redirect_to=page-d-exemple"}>
                    <span><i className="icon-close"></i>&nbsp;Déconnexion</span>
                    </a>
                </div>
                <div className="content_bouton_start">
                    {
                    nouveau == 'adherent' ? (
                        <Link key="1" to="/cotisation" className='bt_bleu_outline'><span>Commencer mon adhésion&nbsp;<i className="icon-chevron-droite"></i></span></Link>
                    ):(
                        <Link key="1" to="/formulaire" className='bt_bleu_outline'><span>Commencer mon adhésion&nbsp;<i className="icon-chevron-droite"></i></span></Link>
                    )
                    }
                </div>
                </>
            ):(
                <div className='content_start'>

                    <div>
                        <h2 className='titre_adhesion'>Je suis déjà adhérent</h2>
                        <a href="/member-login?redirect_to=page-d-exemple" className='bt_bleu'><span><i className="icon-valider"></i>&nbsp;Je m'identifie</span></a>
                    </div>

                    <div>
                        <h2 className='titre_adhesion'>Je suis nouveau...</h2>
                        <Link key="2" to="/formulaire" className='bt_bleu_outline'><span>Je crée un compte&nbsp;&#9998;</span></Link>
                    </div>

                </div>
            )
        }
        
        </>
    )
}
export default Home;