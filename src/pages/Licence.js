import { React, useState, useEffect } from 'react';

const Licence = (props) => {

    const {selection,setSelection} = props;

    const handelCheckbox = (event) => {

        let {name} = event.target;

        let newselection = selection.map( (item,index) => {
            if( item.name === name ){
                item.checked = !item.checked;
                if( item.name === 'SKIR' || item.name === 'ALPI'){
                    item.show = !item.show;
                }
            }
            return item;
        })

        setSelection(newselection);
    }

    const handelNiveau = ( event ) => {

        let {name} = event.target;

        let newselection = selection.map( (item,index) => {
            if( item.labelname === name ){
                item.labelchecked = !item.labelchecked;
            }
            return item;
        })

        setSelection(newselection);
        
    }

    useEffect( () => {

    //     if( selection.indexOf('ESCA') > -1 ){
    //         console.log('Licence', 'FFME');
    //         //return false;
    //     }
    //     else{
    //         if( selection.indexOf('ALPI') > -1 || selection.indexOf('SKIR') > -1){
    //             console.log('Licence', 'choix de niveau Alpinisme ou rando');
    //         }
    //         else if( selection.indexOf('VF') > -1 
    //                     || selection.indexOf('CA') > -1 
    //                     || selection.indexOf('VTT') > -1 
    //                     || selection.indexOf('SKIA') > -1 
    //                     && !suppd ){
    //             console.log('Licence FFR', 'IMPN', 'IMPNJ', 'IMPNF');
    //         }else {
    //             console.log('Licence FFR', 'SIMPLE');
    //         }
    //     }

         console.log( 'useEffect', selection );
        
    },[selection]);

    return(
        <>
        <h1>Licences / Assurances</h1>
        {
            selection.map( (item,i) => 
                (
                <div className="ligne_licence">
                <label key={i} >
                    <input type="checkbox" name={item.name} id={item.name} checked={ item.checked } onChange={handelCheckbox} />
                    {item.descriptif}
                </label>
                {
                        item.show ? (
                            <div className="sous_ligne_licence">
                                {item.label}
                                <span className="label_sous_ligne_licence">
                                    <input type="checkbox" name={item.labelname} checked={item.labelchecked} onChange={handelNiveau} /> oui
                                </span>
                            </div>
                       ):('')
                    }
                </div>
                )
            )
        }
        </>
    )
}
export default Licence;