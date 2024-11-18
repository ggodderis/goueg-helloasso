import { React, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import FormFamille from '../components/FormFamille';
import Total from '../components/Total';
import useHello from '../hooks/useHello';
// import useSession from '../hooks/useSession';
import useLoader from '../hooks/useLoader';
import { ContextDatas } from '../hooks/useContextDatas';

const Cotisation = (props) => {

    const [token,startPaye] = useHello();
    // const [session,saveDatasSession] = useSession();

    const navigate = useNavigate();
    const [showLoader] = useLoader();

    const {liste,datas,metadata,handelDatas} = useContext( ContextDatas );
    const {nav,setNav} = props;
    const [etat,setEtat] = useState(false);

    const {club} = liste;

    //console.log('cotisation',club,user);
    

    /** 
     * POUR LA NAVIGATION
     * On regarde si le label Formulaire existe dans nav
     * si il n'existe pas on l'ajoute
     */
    function trouve( name ){
        return nav.find( (nav) => nav.label === name );
    }

    useEffect( () => {

        if( trouve('Cotisation') === undefined ){
            setNav([...nav,
                { to: '/cotisation', label: 'Cotisation'}
            ]);
        }

    }, []);

    const handelClickValidation = (event) => {
        //console.log('validation', event.target, club );
        navigate('/licence');
    }
/** */

    const handelClickCotisation = (event) => {

        const {name,value} = event.target;

        const el = Object.entries(club).reduce( (newObject,[key,obj]) => {
          if( obj.titre === value ) {
            newObject = obj;
          }
          return newObject;
        },{});

        if( el.titre != "F" ){
            setEtat(false);
        }
        
        handelDatas('COTISATION',el);

    }

    const handelClickMurSoutien = (event) => {

        const {name,value,checked} = event.target;

        switch (name) {
            case 'mur':
                if( checked ){
                    handelDatas('MUR',value);
                }else{
                    handelDatas('MUR',0);
                }   
                break;
            case 'soutien':
                if( checked ){
                    handelDatas('SOUTIEN',value);
                }else{
                    handelDatas('SOUTIEN',0);
                }  
                break;
        }
        
    }

    const handelClickPrecedente = (event) => {
        //console.log('validation', event.target, club );
        nav.map( (item,i) => {
            
            if( item.label == 'Cotisation') {
                let index = i-1;
               navigate( nav[index].to );
            }
            
        })
    }
    /**
     * On paye !
     */
    const handelPaye = (event) => {
        startPaye(datas);
        showLoader();
    }


    return(
    <div>
        <div className="bandeau_haut">
            <span className="bandeau_haut_titre">Cotisation au club</span>
        </div>
       <fieldset><legend>Choix de la cotisation au club</legend>
        {
            club ? (
            Object.entries(club).map( ([key,obj]) => (
                    // {"key":{id:1,titre:"ddk"}}
                    <label className="label_radio" key={key}>
                        <input type="radio"
                            onChange={ handelClickCotisation }
                            name="type_cotisation" value={obj.titre}
                            checked={ metadata.cotisation === obj.titre }
                            />
                            <span className="new_input"></span>
                            <span>{obj.descriptif} :&nbsp;<b>{obj.tarif/100}€</b></span>
                    </label>
                    )
                )
            ):('')
        }
            <h4 className="hello_h4">Voulez-vous ajouter une cotisation de soutien au club ?</h4>
                <label className="label_radio">
                    <input type="checkbox" name="soutien" checked={ metadata.soutien } value={REACT_VARS.soutien[0].plein_tarif} onChange={handelClickMurSoutien} />
                    <span className="new_input"></span>
                    <span>{REACT_VARS.soutien[0].descriptif} :&nbsp;<b>{ REACT_VARS.soutien[0].plein_tarif / 100 }€</b></span>
                </label>

        </fieldset>


            {
                metadata.cotisation === 'F' ? ( <FormFamille datas={datas} setEtat={setEtat} handelDatas={handelDatas} /> ):('')
            }

        <fieldset>
            <label className="label_radio" key="rgpd">
                <input type="checkbox" checked={ true } />
                <span className="new_input"></span>
                <small>J’accepte le traitement informatisé des données personnelles qui me concernent en conformité avec les dispositions de la loi n°2018-493 du 20 juin 2018 relative à la protection des données. J’ai noté que je pourrai exercer les droits qui me sont garantis par le RGPD en m’adressant à l’Association Les Grimpeurs des Alpes.</small>
            </label>
        </fieldset>

            <Total/>

            <div className="navig_bottom">
                <button type="button" className='bt_bleu_outline' onClick={handelClickPrecedente}><i className="icon-chevron-gauche"></i>&nbsp;Étape précédente</button>
            {
                metadata.cotisation === 'API' || etat === true ? 
                (<button type="button" className='bt_vert' onClick={handelPaye}><i className="icon-valider"></i>&nbsp;Payer mon adhésion</button>):('') 

            }
            {
                metadata.cotisation != 'API' && metadata.cotisation != '' && metadata.cotisation != 'F' ? 
                (<button type="button" className='bt_bleu' onClick={ handelClickValidation }>Étape suivante&nbsp;<i className="icon-chevron-droite"></i></button>):('')
            }
            </div>
    </div>
    )
}
export default Cotisation;