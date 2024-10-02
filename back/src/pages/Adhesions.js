import { React, useEffect, useState } from 'react';

import useClients from "../hooks/usetClients";
import Loader from "../components/Loader";

const Adhesions = () => {

    const [clients,handelClients] = useClients();

    
    useEffect( () => {
        if( clients ){
            console.log( clients );
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
                            id table:: {item.id}
                            id hello:: {item.metas.id}
                           {item.metas.metadata?.payer.firstName}
                           {item.metas.metadata?.payer.lastName}
                        </div>
                    ))

                ):( <Loader />)
            }
        </div>
    );
}

export default Adhesions;