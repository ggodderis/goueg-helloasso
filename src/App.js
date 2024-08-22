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
import useDatas from './hooks/useDatas';

import './css/style_helloasso.css';

const App = () => {

    const adherent = the_ajax_script.infosUser;
    const [cotisation,setCotisation] = useState('');
    // const [liste,handelFetch] = useFetch();
    const [datas,user,metadata,handelDatas] = useDatas();

    const [nav,setNav] = useState([
        { to: '/', label: 'Home'}
    ]);


    useEffect( () => {
        console.log('from useDatas',datas);
        // handelDatas('je modifie metadata');
    },[datas]);
/**
 * Si c'est une connection direct d'un déjà adhérent
 */
    useEffect( () => {
        if( adherent.firstName ){
            //setUser(adherent);
            handelDatas('adherent',adherent);
            // setDatas({...datas,
            //     totalAmount : 666,
            //     payer: adherent });
        }
    },[]);

    return (
        <>
        <Header nav={nav} />
            <Routes>
                <Route exact path="/" element={ <Home user={user} /> } />
                <Route exact path="/formulaire" element={ <Form nav={nav} setNav={setNav} /> } />
                <Route exact path="/cotisation" element={ <Cotisation nav={nav} setNav={setNav} user={user} metadata={metadata} handelDatas={handelDatas} /> } />
                <Route exact path="/licence" element={ <Licence /> } />
                <Route exact path="*" element={ <Errors /> } />
            </Routes>
        </>
     );
}

export default App;