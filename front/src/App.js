import { React, useEffect, useState } from 'react';
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
/**
 * Hooks
 */
import useDatas from './hooks/useDatas';
/**
 * CSS
 */
import './css/style_helloasso.css';

const App = () => {

   // console.log( the_ajax_script.session_id );
    
    /**
     * @param adherent contient les infos de l'adhérent du club
     * @param nouveau pur savoir si c'est un nouvel adhérent 
     */
    const location = useLocation();
    const adherent = the_ajax_script.infosUser;
    const [nouveau,setNouveau] = useState('');
    const [datas,user,liste,metadata,selection,setSelection,handelDatas] = useDatas();
    
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
        window.scrollTo({ top: 200 , behavior: 'smooth' });
    }

},[location]);

/**
 * Si c'est une connection direct d'un déjà adhérent
 */

    useEffect( () => {
        if( adherent.firstName ){
            setNouveau('adherent');
            handelDatas('adherent',adherent);
        }
    },[]);

    return (
        <>
        {/* <Header nav={nav} /> */}
            <Routes>
                <Route exact path="/" element={ <Home nouveau={nouveau} user={user} /> } />
                <Route exact path="/formulaire" element={ <Form setNouveau={setNouveau} nav={nav} setNav={setNav} user={user} handelDatas={handelDatas}/> } />
                <Route exact path="/cotisation" element={ <Cotisation datas={datas} nav={nav} setNav={setNav} liste={liste} metadata={metadata} handelDatas={handelDatas} /> } />
                <Route exact path="/licence" element={ <Licence datas={datas} handelDatas={handelDatas} nav={nav} liste={liste} setNav={setNav} selection={selection} setSelection={setSelection} /> } />
                <Route exact path="*" element={ <Errors /> } />
            </Routes>
            <div className="bandeau_bas">
                <p className="hello_infos">
                    <i className="icon-infos"></i>
                    &nbsp;Lors de la validation de votre adhésion, vous serez rediriger sur la page de paiement sécurisée HelloAsso.
                </p>
            </div>
        </>
     );
}

export default App;