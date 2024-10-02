import { React, useEffect, useState } from 'react';
/**
 * Components
 */
import ModuleTarifs from '../components/ModuleTarifs';
/**
 * Hooks
 */
import useTarifs from '../hooks/useTarifs';
import Loader from '../components/Loader';

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
            <h1>Tarifs Adhésions au Club</h1>
            <div className="content_tarifs">
                {
                    tarifs?.cotisations ? (<ModuleTarifs tarifs={tarifs.cotisations} />):( <Loader />)
                }
            </div>
            <h1>Tarifs FFME</h1>
            <div className="content_tarifs">
                {
                    tarifs?.cotisations ? ( <ModuleTarifs tarifs={tarifs.ffme} /> ):(<Loader />)
                }
            </div>
            <h1>Tarifs options FFME</h1>
            <div className="content_tarifs">
                {
                    tarifs?.ffme_options ? ( <ModuleTarifs tarifs={tarifs.ffme_options} /> ):(<Loader />)
                }
            </div>
            <h1>Tarifs FFR</h1>
            <div className="content_tarifs">
                {
                    tarifs?.cotisations ? ( <ModuleTarifs tarifs={tarifs.ffr} /> ):(<Loader />)
                }
            </div>
        </div>
    )
}
export default Tarifs;