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
    const [selection,setSelection] = useState([
        {descriptif:'Randonnée pédestre', name: 'RP', checked: false },
        {descriptif:'Raquette à neige', name: 'RN', checked: false },
        {descriptif:'Via ferrata', name: 'VF', checked: false },
        {descriptif:'Canyoning', name: 'CA', checked: false },
        {descriptif:'Ski alpin sur domaine station', name: 'SKIA', checked: false },
        {descriptif:'Vtt', name: 'VTT', checked: false },
        {descriptif:'Escalade', name: 'ESCA', checked: false },
        {descriptif:'Alpinisme', name: 'ALPI', checked: false, label: 'Pratiquez vous l\'alpinisme à un niveau supérieur à PD ?', labelname: 'ALPI_SUP', labelchecked: false, show: false },
        {descriptif:'Ski de randonnée', name: 'SKIR', checked: false, label: 'Pratiquez vous le Ski de randonnée à un niveau supérieur à PD ?', labelname: 'SKIR_SUP',labelchecked: false, show: false }

    ]);
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
                <Route exact path="/licence" element={ <Licence selection={selection} setSelection={setSelection} /> } />
                <Route exact path="*" element={ <Errors /> } />
            </Routes>
        </>
     );
}

export default App;