import { React, useState, useEffect } from 'react';

const Cotisation = () => {

    const [cotisation,setCotisation] = useState('');
    const [isbutton,setIsbutton] = useState(false);

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

        <label className="label_ligne">
            <input type="radio"
            onChange={ handelClickCotisation }
            checked={ cotisation === "seul" }
            name="type_cotisation" value="seul"/>
            J'adhére seul
        </label>

        <label className="label_ligne">
            <input type="radio"
            onChange={ handelClickCotisation }
            checked={ cotisation === "famille" }
            name="type_cotisation" value="famille"/>
            J'adhére en Famille (2 adultes et un enfant mineur minimum)
        </label>

        <label className="label_ligne">
            <input type="radio"
            onChange={ handelClickCotisation }
            checked={ cotisation === "chomeur" }
            name="type_cotisation"
            value="chomeur"/>
            J'adhére seul et suis chômeur et adhérent du club depuis plus d'un an (justificatif à fournir)
        </label>

        <label className="label_ligne">
            <input type="radio"
            onChange={ handelClickCotisation }
            checked={ cotisation === "membre" }
            name="type_cotisation" value="membre"/>
            Je suis membre à vie
        </label>

        <label className="label_ligne">
            <input type="radio"
            onChange={ handelClickCotisation }
            checked={ cotisation === "non_pratiquant" }
            name="type_cotisation" value="non_pratiquant" />
            Adhérent non pratiquant
        </label>
        {
            isbutton && <button type="button" id="valider" onClick={ handelClickValidation }>valider</button>
        }
        </div>
    )
}
export default Cotisation;