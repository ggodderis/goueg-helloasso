import { React, useState, useEffect } from 'react';

const Cotisation = (props) => {

    const {cotisation,setCotisation} = props;
    const [isbutton,setIsbutton] = useState(false);

    const {club} = props.liste;

    console.log(props);
    


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
        Object.entries(club).map( ([key,obj]) => (
                // {"key":{id:1,titre:"ddk"}}
                <label className="label_ligne" key={key}>
                    <input type="radio"
                        onChange={ handelClickCotisation }
                        checked={ cotisation === obj.titre }
                        name="type_cotisation" value={obj.titre}/>
                        {obj.descriptif} - <b>{obj.plein_tarif/100}€</b>
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