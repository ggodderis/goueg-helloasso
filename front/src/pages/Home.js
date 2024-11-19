import { React, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {ContextDatas} from "../hooks/useContextDatas"

const Home = (props) => {

    const {nouveau} = props;
    const {user} = useContext( ContextDatas );

    console.log( REACT_VARS.siteUrl );
    
    
    return(
        <>
        {
            user.firstName ? (
                <>
                <div className="bandeau_haut">
                    <span className="bandeau_haut_titre">Bonjour, <b>{user.firstName} {user.lastName}</b></span>
                    <a className="hello_deconnexion" href={"/wp-login.php?action=logout&_wpnonce="+REACT_VARS.logoutNonce+"&redirect_to=le-club/adherer-au-club/#rootHelloAsso"}>
                    <span><i className="icon-close"></i>&nbsp;Déconnexion</span>
                    </a>
                </div>
                <h4 className="titre_welcome">Tout au long du processus d’adhésion vous serez guidé afin de vous proposer le meilleur choix.</h4>
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
                <>
                <div className="bandeau_haut">
                    <span className="bandeau_haut_titre">Adhésion en ligne</span>
                </div>
                <div className='content_start'>

                    <div>
                        <h2 className='titre_adhesion'>Je suis déjà adhérent</h2>
                        <a href="/member-login?redirect_to=le-club/adherer-au-club/#rootHelloAsso" className='bt_bleu'><span><i className="icon-valider"></i>&nbsp;Je m'identifie</span></a>
                    </div>

                    <div>
                        <h2 className='titre_adhesion'>Je suis nouveau...</h2>
                        <Link key="2" to="/formulaire" className='bt_bleu_outline'><span>Je crée un compte&nbsp;&#9998;</span></Link>
                    </div>

                </div>
                </>
            )
        }
        
        </>
    )
}
export default Home;