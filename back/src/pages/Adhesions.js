import { React, useEffect, useState } from 'react';

import useClients from "../hooks/useClients";
import Loader from "../components/Loader";
import Navigdate from '../components/Navigdate';
import BlockAdherent from '../components/BlockAdherent';

const Adhesions = () => {

    const [clients,handelClients] = useClients();
    
    useEffect( () => {
        if( clients ){
            console.log( "Adhésions page", clients.adherents );
        }else{
            handelClients();
        }
    },[clients]);


    return(
        <div className="hello_content_clients">
            <h1>ADHESIONS</h1>
            {
                clients?.dates ? ( <Navigdate dates={clients.dates} clients={clients} handelClients={handelClients} /> ):('')
            }
            
            {
                clients?.adherents ? (
                    clients.adherents.map( (item,i) => (
                    <BlockAdherent { ...item } />
                ) )
                ):(<Loader />)
            }
        </div>
    );
}

export default Adhesions;