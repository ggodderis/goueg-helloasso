import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Total from '../components/Total';

const Cotisation = (props) => {
    
    const {nav,setNav,user,liste,metadata,handelDatas} = props;
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

    function handelClickValidation(event){
        console.log('validation', event.target, club );
        navigate('/licence');
    }

    return(
       <div>
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
        <Total />
        {
            metadata.cotisation && <button type="button" id="valider" className='bt_bleu' onClick={ handelClickValidation }>Étape suivante</button>
        }
        </div>
    )
}
export default Cotisation;