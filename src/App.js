import {React,useEffect,useState} from 'react';
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
import Header from './components/Header';
/**
 * Hooks
 */
import useFetch from './hooks/useFetch';
import useDatas from './hooks/useDatas';
/**
 * CSS
 */
import './css/style_helloasso.css';

const App = () => {

    const location = useLocation();
    const adherent = the_ajax_script.infosUser;
    const [nouveau,setNouveau] = useState('');
    const [datas,user,liste,metadata,handelDatas] = useDatas();

    //console.log(the_ajax_script.options_ffme);
    
    /**
     * @param selection []
     * Contient la liste des activités pour les licences
     * contient également les selections faites par l'adhérent
     */
    const [selection,setSelection] = useState({
        famille: '',
       activites: [
        {descriptif:'Randonnée pédestre', name: 'RP', checked: false },
        {descriptif:'Raquette à neige', name: 'RN', checked: false },
        {descriptif:'Via ferrata', name: 'VF', checked: false },
        {descriptif:'Canyoning', name: 'CA', checked: false },
        {descriptif:'Ski alpin sur domaine station', name: 'SKIA', checked: false },
        {descriptif:'Vtt', name: 'VTT', checked: false },
        {descriptif:'Escalade', name: 'ESCA', checked: false },
        {descriptif:'Alpinisme', name: 'ALPI', checked: false, label: 'Pratiquez vous l\'alpinisme à un niveau supérieur à PD ?', labelname: 'ALPI_SUP', labelchecked: false, show: false },
        {descriptif:'Ski de randonnée', name: 'SKIR', checked: false, label: 'Pratiquez vous le Ski de randonnée à un niveau supérieur à PD ?', labelname: 'SKIR_SUP',labelchecked: false, show: false }
       ],
       options: the_ajax_script.options_ffme
    }
    );

    const [nav,setNav] = useState([
        { to: '/', label: 'Home'}
    ]);

    useEffect( () => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
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
        </>
     );
}

export default App;