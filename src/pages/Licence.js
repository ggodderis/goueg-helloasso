import { React, useState, useEffect } from 'react';

const Licence = (props) => {

    //console.log( props );

    const [licences,setLicences] = useState([
        {descriptif:'Randonnée pédestre', name: 'RP', checked: false },
        {descriptif:'Raquette à neige', name: 'RN', checked: false },
        {descriptif:'Via ferrata', name: 'VF', checked: false },
        {descriptif:'Canyoning', name: 'CA', checked: false },
        {descriptif:'Ski alpin sur domaine station', name: 'SA', checked: false },
        {descriptif:'Vtt', name: 'VTT', checked: false },
        {descriptif:'Escalade', name: 'ESC', checked: false },
        {descriptif:'Alpinisme', name: 'ALP', checked: false },
        {descriptif:'Ski de randonnée', name: 'SDR', checked: false }

    ]);

    const [selection,setSelection] = useState([]);

    const handelCheckbox = (event) => {
        const {name} = event.target;

        console.log( event );

        if( selection.indexOf(name) > -1 ) {
            console.log('il faut le supprimer');
            const newSelection = selection.filter( (item) => { return item !== name } );
            setSelection(newSelection);
        }else{
            setSelection([...selection,name]);
        }
    }

    useEffect( () => {
        console.log( selection );
        
    },[selection]);

    return(
        <>
        <h1>Licences / Assurances</h1>
        {
            licences.map( (item,i) => 
                (
                <>
                <label key={i} >
                    <input type="checkbox" name={item.name} id={item.name} checked={ selection.indexOf(item.name) > -1 } onChange={handelCheckbox} />
                    {item.descriptif}
                </label>
                <br />
                </>
                )
            )
        }
        </>
    )
}
export default Licence;