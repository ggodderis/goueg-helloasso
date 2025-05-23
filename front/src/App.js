import { React, useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

/**
 * Pages
 */
import Home from './pages/Home';
import Licence from './pages/Licence';
import Form from './pages/Form';
import Errors from './pages/Errors';
import Cotisation from './pages/Cotisation';
/**
 * Components
 */
// import Header from './components/Header';
import { ContextDatas } from './hooks/useContextDatas';
/**
 * Asset
 */
import hello from './assets/hello.png';


const App = () => {

   // console.log( REACT_VARS.session_id );
    const {user,handelDatas} = useContext( ContextDatas );

    
    /**
     * @param adherent contient les infos de l'adhérent du club
     * @param nouveau pur savoir si c'est un nouvel adhérent 
     */
    const location = useLocation();
    const adherent = REACT_VARS.infosUser;
    const [nouveau,setNouveau] = useState('');

    
    const [nav,setNav] = useState([
        { to: '/', label: 'Home'}
    ]);

    /**
     * Scroll to
     */

    useEffect( () => {

        let top = document.getElementById( 'rootHelloAsso' );

        if( location.pathname != "/"){
            window.scrollTo({ top: top.offsetTop-20, behavior: 'smooth' });
        }else{
            //window.scrollTo({ top: 200 , behavior: 'smooth' });
        }

    },[location]);

    /**
     * Si c'est une connection direct d'un déjà adhérent
     */

    useEffect( () => {
        if( adherent.firstName ){
            setNouveau('adherent');
            handelDatas('ADHERENT',adherent);
        }
    },[]);

    return (
        <>
        {/* <Header nav={nav} /> */}
            <Routes>
                <Route exact path="/" element={ <Home nouveau={nouveau} /> } />
                <Route exact path="/formulaire" element={ <Form nav={nav} setNav={setNav} setNouveau={setNouveau} /> } />
                <Route exact path="/cotisation" element={ <Cotisation nav={nav} setNav={setNav} /> } />
                <Route exact path="/licence" element={ <Licence nav={nav} setNav={setNav} /> } />
               <Route exact path="*" element={ <Errors /> } />
            </Routes>
            <div className="bandeau_bas">
                <p className="hello_infos">
                    <i className="icon-infos"></i>
                    &nbsp;Lors de la validation de votre adhésion, vous serez redirigé sur la page de paiement sécurisée HelloAsso.
                </p>
                <p className="hello_description">
                <img src={hello} alt="Helloasso" />
                <span>HelloAsso est une entreprise sociale et solidaire, qui fournit gratuitement ses technologies de paiement à l’organisme Association Les Grimpeurs des Alpes. <b>Une contribution au fonctionnement de HelloAsso, modifiable et facultative</b>, vous sera proposée avant la validation de votre paiement.</span>
                </p>
            </div>
        </>
     );
}

export default App;