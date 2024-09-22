import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FormFamille from '../components/FormFamille';
import Total from '../components/Total';
import Loader from '../components/Loader';
import useHello from '../hooks/useHello';
import useSession from '../hooks/useSession';

const Cotisation = (props) => {

    const [token,startPaye] = useHello();
    const [session,saveDatasSession] = useSession();

    const navigate = useNavigate();

    
    const {nav,setNav,liste,datas,metadata,handelDatas} = props;
    const [loader,setLoader] = useState(false);
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

        if( el.titre != "F/F2" ){
            setEtat(false);
        }
        
        handelDatas('cotisation',el);

    }

    const handelClickMurSoutien = (event) => {

        const {name,value,checked} = event.target;

        switch (name) {
            case 'mur':
                if( checked ){
                    handelDatas('mur',value);
                }else{
                    handelDatas('mur',0);
                }   
                break;
            case 'soutien':
                if( checked ){
                    handelDatas('soutien',value);
                }else{
                    handelDatas('soutien',0);
                }  
                break;
        }
        
    }

    function handelClickPrecedente(event){
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
        setLoader(true);
        saveDatasSession(datas);
        //startPaye(datas);
    }

    useEffect( () => {
        console.log("Retour de session",session,the_ajax_script.session_id);
    },[token,session])

    return(
    <div>
        {
            loader ? (<Loader />):('')
        }
        <div className="bandeau_haut">
            <span className="bandeau_haut_titre">Cotisation au club</span>
        </div>
       <fieldset><legend>Choix de cotisation au club</legend>
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
                            {obj.descriptif} :&nbsp;<b>{obj.tarif/100}€</b>
                    </label>
                    )
                )
            ):('')
        }
            <h4 className="hello_h4">Voulez-vous ajouter une cotisation de soutien au club ?</h4>
                <label className="label_radio">
                    <input type="checkbox" name="soutien" checked={ metadata.soutien } value="1000" onChange={handelClickMurSoutien} />cotisation de soutien au club :&nbsp;<b>10€</b>
                    </label>
        </fieldset>


            {
                metadata.cotisation === 'F/F2' ? ( <FormFamille datas={datas} setEtat={setEtat} handelDatas={handelDatas} /> ):('')
            }

            <Total datas={datas}/>
            <div className="navig_bottom">
                <button type="button" className='bt_bleu_outline' onClick={handelClickPrecedente}><i className="icon-chevron-gauche"></i>&nbsp;Étape précédente</button>
            {
                metadata.cotisation === 'ANP' || etat === true ? 
                (<button type="button" className='bt_vert' onClick={handelPaye}><i className="icon-valider"></i>&nbsp;Payer mon adhésion</button>):('') 

            }
            {
                metadata.cotisation != 'ANP' && metadata.cotisation != '' && metadata.cotisation != 'F/F2' ? 
                (<button type="button" className='bt_bleu' onClick={ handelClickValidation }>Étape suivante&nbsp;<i className="icon-chevron-droite"></i></button>):('')
            }
            </div>
    </div>
    )
}
export default Cotisation;