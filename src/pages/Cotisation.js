import { React, useState, useEffect } from 'react';

const Cotisation = (props) => {

    const [cotisation,setCotisation] = useState('');
    const [isbutton,setIsbutton] = useState(false);

    const {club} = props.liste;

    console.log(club[1].id);
    

    function handelClickCotisation(event){

        const {name,value} = event.target;

        console.log('validation', name, value );
        
        setCotisation(value);
        setIsbutton(true);
    }

    function handelClickValidation(event){
        console.log('validation', event.target );
    }


    return(
       <div>
        { 
            
                Object.keys(club).map((item, i) => (

                    <label className="label_ligne" key={i}>
                    <input type="radio"
                        onChange={ handelClickCotisation }
                        checked={ cotisation === club[item].titre }
                        name="type_cotisation" value={club[item].titre}/>
                        {club[item].label} - <b>{club[item].plein_tarif/100}€</b>
                    </label>
                 ))
    
        }

        {
            isbutton && <button type="button" id="valider" onClick={ handelClickValidation }>valider</button>
        }
        </div>
    )
}
export default Cotisation;