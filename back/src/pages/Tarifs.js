import { React, useEffect, useState } from 'react';
/**
 * Components
 */
import ModuleTarifs from '../components/ModuleTarifs';
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
    //console.log( tarifs?.cotisations , tarifs?.ffme , tarifs?.ffr  );
    
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
            <h2>Tarifs Adhérents au Club</h2>
            <div className="content_tarifs">
                {
                    tarifs?.cotisations && <ModuleTarifs tarifs={tarifs.cotisations} />
                }
            </div>
            <h2>Tarif FFME</h2>
            <div className="content_tarifs">
                {
                    tarifs?.cotisations && <ModuleTarifs tarifs={tarifs.ffme} />
                }
            </div>
            <h2>Tarif FFR</h2>
            <div className="content_tarifs">
                {
                    tarifs?.cotisations && <ModuleTarifs tarifs={tarifs.ffr} />
                }
            </div>
        </div>
    )
}
export default Tarifs;