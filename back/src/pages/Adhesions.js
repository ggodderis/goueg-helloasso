import { React, useEffect, useState } from 'react';

import useClients from "../hooks/useClients";
import Loader from "../components/Loader";

const Adhesions = () => {

    const [clients,handelClients] = useClients();

    
    useEffect( () => {
        if( clients ){
            console.log( "Adhésions page", clients );
        }else{
            handelClients();
        }
    },[clients]);

    return(
        <div className="hello_content_clients">
            <h1>ADHESIONS</h1>
            {
                clients ? (
                    clients.map( (item,i) => (
                    <div key={item.id} className="ligne_client">
                        <span>{item.id}</span>
                        <h3>{item.metas.metadata?.payer.lastName} - {item.metas.metadata?.payer.firstName}</h3>
                        <span>Date du paiement: {item.date_create}</span>
                        <span>Statut du paiement: {item.statut}</span>
                        <span>Cotisation club: {item.metas.metadata?.cotisation}</span>
                        <span>Type cotisation: {item.metas.metadata?.cotisation_famille}</span>
                        {
                            item.metas.metadata?.cotisation_famille == 'famille' ? (<b>Liste membres</b>):('')
                        }
                        <span>Licence: {item.metas.metadata?.type_licence}</span>
                        <button type="button">Rafraîchir</button>
                    </div>
                ) )
                ):(<Loader />)
            }
        </div>
    );
}

export default Adhesions;