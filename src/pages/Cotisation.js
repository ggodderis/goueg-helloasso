import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FormFamille from '../components/FormFamille';
import Total from '../components/Total';

const Cotisation = (props) => {
    
    const {nav,setNav,user,liste,datas,metadata,handelDatas} = props;
    const navigate = useNavigate();

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

    function handelClickValidation(event){
        //console.log('validation', event.target, club );
        navigate('/licence');
    }
/** */

    function handelClickCotisation(event){

        const {name,value} = event.target;

        const el = Object.entries(club).reduce( (newObject,[key,obj]) => {
          if( obj.titre === value ) {
            newObject = obj;
          }
          return newObject;
        },{});
        
        handelDatas('cotisation',el);

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

    return(
       <div>
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
                            {obj.descriptif} - <b>{obj.tarif/100}€</b>
                    </label>
                    )
                )
            ):('')
        }
        </fieldset>
        {
            metadata.cotisation === 'F/F2' ? ( <FormFamille /> ):('')
        }
        <fieldset><legend>Voulez-vous utiliser le mur d'escalade au gymnase Berthe de Boissieux ?</legend></fieldset>
        <fieldset><legend>Voulez-vous ajouter une cotisation de soutien au club ?</legend></fieldset>
        <Total datas={datas}/>
        {
            metadata.cotisation && 
            <div className="navig_bottom">
                <button type="button" className='bt_bleu_outline' onClick={handelClickPrecedente}>Étape précédente</button>
                <button type="button" className='bt_bleu' onClick={ handelClickValidation }>Étape suivante</button>
            </div>
        }
        </div>
    )
}
export default Cotisation;