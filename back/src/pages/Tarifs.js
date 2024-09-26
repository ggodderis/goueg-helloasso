import { React, useEffect, useState } from 'react';
/**
 * Hooks
 */
import useTarifs from '../hooks/useTarifs';

const Tarifs = () => {

    const [tarifs,handelTarifs] = useTarifs();
    //const [cotisa,setCotisa] = useState([]);

    /**
     * Si @param cotisation est vide on appel le hook useTarifs pour avoir les infos
     */
    console.log( tarifs?.cotisations , tarifs?.ffme , tarifs?.ffr  );
    
    useEffect( () => {

        if( tarifs ){
            console.log( tarifs );
        }else{
            handelTarifs();
        }
        
    },[tarifs]);

    return(
        <div>
        <h1>Gestion des tarifs</h1>
            <h2>Tarif cotiations club</h2>
            <ul>
            {
                tarifs?.cotisations.map( (item,i) => (<li key={item.id}>{item.titre}</li>))
            }
            </ul>
            <h2>Tarif FFME</h2>
            <ul>
            {
                tarifs?.ffme.map( (item,i) => (<li key={item.id}>{item.titre}</li>))
            }
            </ul>
            <h2>Tarif FFR</h2>
            <ul>
            {
                tarifs?.ffr.map( (item,i) => (<li key={item.id}>{item.titre}</li>))
            }
            </ul>
        </div>
    )
}
export default Tarifs;