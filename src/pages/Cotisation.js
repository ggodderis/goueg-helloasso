import { React, useState, useEffect } from 'react';

import useCotisations from '../hooks/useCotisations';

const Cotisation = (props) => {

    const [liste,handelCotisation] = useCotisations();
    const [isbutton,setIsbutton] = useState(false);
    const {nav,setNav,user,metadata,handelDatas} = props;


    console.log( 'Cotisation', liste );
 

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

        handelCotisation(user.dateOfBirth);

    }, []);
    


    function handelClickCotisation(event){

        const {name,value} = event.target;
        const toto = Object.entries(liste).reduce( (newObject,[key,obj]) => {
          if( obj.titre === value ) {
            newObject = obj;
          }
          return newObject;
        },{});
        // const toto = Object.entries(liste).filter( ([key,obj]) => { 
        //     if( obj.titre === value ){
        //         return obj;
        //     }
        // } )
        console.log( toto );
        
        //console.log( 'validation', name, value, 'find', toto.tarif, toto.titre );
        handelDatas('cotisation',toto);
        // setCotisation(value);
        // setIsbutton(true);
    }

    function handelClickValidation(event){
        console.log('validation', event.target, liste );
        //handelDatas('cotisation',)
    }

//checked={ cotisation === obj.titre }
    return(
       <div>
        {
        Object.entries(liste).map( ([key,obj]) => (
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
        }
        
        {
            isbutton && <button type="button" id="valider" onClick={ handelClickValidation }>valider</button>
        }
        </div>
    )
}
export default Cotisation;