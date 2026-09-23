import { React, useEffect, useState } from 'react';

import useClients from "../hooks/useClients";
import Loader from "../components/Loader";
import Navigdate from '../components/Navigdate';
import BlockAdherent from '../components/BlockAdherent';

const Adhesions = () => {

    const [clients,handelClients] = useClients();
    
    //console.log( clients );
    
    
    useEffect( () => {
        handelClients();
    },[]);


    return(
        <div className="hello_content_clients">
            <h1>ADHESION(S) { clients?.adherents ? (<span>{clients?.adherents.length}</span>):('') }</h1>
            {
                clients?.dates ? ( <Navigdate dates={clients.dates} clients={clients} handelClients={handelClients} /> ):('')
            }
            
            {
                clients?.adherents ? (

                    clients.adherents.map( (item,i) => {

                        //console.log( i, item.vide );

                        if( item?.vide == 'vide' ){
                            return <div className="ligne_client">
                                        <div className="cellule_titre">
                                            <h2>Pas d'adhésion ...</h2>
                                        </div>
                                    </div>
                        }else{
                            return <BlockAdherent { ...item } />
                        }
                        
                        // if( item.length > 0 ){
                        //     return <BlockAdherent { ...item } />
                        // }

                        }

                    )

                ):(<Loader />)
            }

            {/* {
                clients?.adherents ? (
                    clients.adherents.map( (item,i) => (
                        
                    <BlockAdherent { ...item } />

                ) )
                ):(<Loader />)
            } */}
        </div>
    );
}

export default Adhesions;