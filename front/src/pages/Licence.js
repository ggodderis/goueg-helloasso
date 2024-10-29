import { React, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import Total from '../components/Total';
import useHello from '../hooks/useHello';
import Loader from '../components/Loader';
import LicenceGuide from '../components/LicenceGuide';
import { ContextDatas } from '../hooks/useContextDatas';
import LicenceFree from '../components/LicenceFree';

const Licence = (props) => {
    
    const navigate = useNavigate();

    const [token,startPaye] = useHello();
    const [loader,setLoader] = useState(false);
    const {datas,guide,setGuide} = useContext( ContextDatas );
    const {nav,setNav} = props;

    /** 
     * POUR LA NAVIGATION
     * On regarde si le label Formulaire existe dans nav
     * si il n'existe pas on l'ajoute
     */
    function trouve( name ){
        return nav.find( (nav) => nav.label === name );
    }

    useEffect( () => {

        if( trouve('Licence') === undefined ){
            setNav([...nav,
                { to: '/licence', label: 'Licence'}
            ]);
        }
    }, []);


    /**
     * On paye !
     */
    const handelPaye = (event) => {
        
        setLoader(true);
        startPaye(datas);

    }


    function handelClickPrecedente(event){
        //console.log('validation', event.target, club );
        nav.map( (item,i) => {
            
            if( item.label == 'Licence') {
                let index = i-1;
                navigate( nav[index].to );
            }
            
        })
    }

    return(
        <>
        {
            loader ? (<Loader />):('')
        }
        <div className="bandeau_haut">
            <span className="bandeau_haut_titre">Choix de la Licence / Assurance</span>
        </div>

        {
            guide === 'oui' ?( <LicenceGuide /> ):( <LicenceFree /> )
        }

        <fieldset>
            <legend>Pour choisir votre Licence / Assurance, voulez vous être guidé ou désirez vous choisir vous même?</legend>
                <label className="label_radio" key="guide_oui">
                    <input type="checkbox" onChange={ () => setGuide('oui')} checked={ guide === 'oui'} />
                    <span className="new_input"></span>
                    Je préfére être guidé
                </label>
                <label className="label_radio" key="guide_non">
                    <input type="checkbox" onChange={ () => setGuide('non')}  checked={ guide === 'non'} />
                    <span className="new_input"></span>
                    Je veux choisir moi même
                </label>
        </fieldset>
   
        <Total/>

        <div className="navig_bottom">
                <button type="button" className='bt_bleu_outline' onClick={handelClickPrecedente}>
                    <i className="icon-chevron-gauche"></i>&nbsp;Étape précédente
                </button>
            {
                datas.metadata.type_licence && datas.metadata.payer.question === true ? (
                <button type="button" id="valider" className='bt_vert' onClick={handelPaye}>
                    <i className="icon-valider"></i>&nbsp;Payer mon adhésion
                </button>):('')
            }
        </div>
        </>
    )
}
export default Licence;