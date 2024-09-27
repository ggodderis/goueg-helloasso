import { React, useEffect, useState } from 'react';

const ModuleTarifs = (props) => {

    const {tarifs} = props;
    const [prix,setPrix] = useState(tarifs);


    useEffect( () => {
        if( prix ){
            console.log('useEffect', prix );
        }else{
            console.log('useEffect', 'Pas encore de données' );
        }
    },[tarifs]);
    

    return(
        <>
        {
           prix.map( (item,i) => (
                <div key={i} className="module_tarifs">
                    <h4>{item.titre}</h4>
                    <span>{item.type_licence}</span>
                    <span>{item.description}</span>
                    <span>{item.descriptif}</span>
                    <span>{item.plein_tarif}</span>
                    <span>{item.demi_tarif}</span>
                </div>
                )
            )
        }
        </>
    );

}
export default ModuleTarifs;