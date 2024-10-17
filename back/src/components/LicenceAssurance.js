import { React, useEffect, useState } from 'react';

const LicenceAssurance = (props) => {
    
    return (
        <>
        {
            props?.type_licence != "" ? (
                <>
                    <div className="cellule_client">
                    <h4>Licence / Assurance</h4>
                    <span>Licence: <b>{props.type_licence}</b></span>
                    <span>Type: <b>{props.licence_famille}</b></span>
                    <span>Prix: <b>{props.tarif_licence/100} €</b></span>
                    </div>

                    <div className="cellule_client">
                        <h4>Options</h4>
                        {
                            props.options_ffme.map( (item,i) => item.checked && <span>{item.titre}: <b>{item.plein_tarif/100} €</b></span>)
                        }
                    </div>
                </>

            ):(
                <>
                <div className="cellule_client">
                    <h4>Licence / Assurance</h4>
                </div>
                <div className="cellule_client">
                    <h4>Options</h4>
                </div>
                </>
            )
        }
        
        </>
    )
}
export default LicenceAssurance;