import {React,useEffect,useState} from 'react';
import { Routes, Route } from 'react-router-dom';

/**
 * Pages
 */
import Home from './pages/Home';
import Licence from './pages/Licence';
import Form from './pages/Form';
import Errors from './pages/Errors';
import Cotisation from './pages/Cotisation';
import Header from './components/Header';

import useFetch from './hooks/useFetch';

import './css/style_helloasso.css';

const App = () => {

    const adherent = the_ajax_script.infosUser;
    const [cotisation,setCotisation] = useState('');
    const [liste,handelFetch] = useFetch();
    const [user,setUser] = useState({});

    const [datas,setDatas] = useState( {
        totalAmount: '',
        initialAmount: '',
        itemName: '',
        backUrl: 'https://www.club-montagne.net/helloasso/back.php', 
        errorUrl: 'https://www.club-montagne.net/helloasso/error.php', 
        returnUrl: 'https://www.club-montagne.net/helloasso/return.php', 
        containsDonation: true, 
        payer: {},
        metadata: {
            id: '',
            cotisation: '',
            tarif_cotisation: '',
            licence: '',
            tarif_licence: ''
        }
    } )

    useEffect( () => {
        console.log(datas);
    },[datas]);
/**
 * Si c'est une connection direct d'un déjà adhérent
 */
    useEffect( () => {
        if( adherent.firstName ){
            setUser(adherent);
            // setDatas({...datas,
            //     totalAmount : 666,
            //     payer: adherent });
        }
    },[]);

    return (
        <>
        <Header/>
            <Routes>
                <Route exact path="/" element={ <Home user={user} handelFetch={handelFetch} /> } />
                <Route exact path="/cotisation" element={ <Cotisation liste={liste} cotisation={cotisation} setCotisation={setCotisation} /> } />
                <Route exact path="/licence" element={ <Licence liste={liste} /> } />
                <Route exact path="*" element={ <Errors /> } />
            </Routes>

        <button type="button" >Valider la commande</button>
        </>
     );
}

export default App;