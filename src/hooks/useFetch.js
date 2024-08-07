import { React, useEffect, useState } from 'react';

const useFetch = () => {

    const [user,setUser] = useState({});

    const [metas,setMetas] = useState({
                                    cotisation : 'famille',
                                    trala: 'pouette',
                                    id: '0001',
                                    licence : 'FFME',
                                    enfant_1 : {
                                        nom: 'Marnie',
                                        prenom: 'Godderis Rivens'
                                    },
                                    enfant_2 : {
                                        nom: 'Aglaé',
                                        prenom: 'Godderis Rivens'
                                    } 
                                
                                });

    console.log(metas.cotisation);

    const ROOT_URL_HELLOASSO = the_ajax_script.rootUrl + "goueg-helloasso/v1/set_datas";
    const data = new FormData();
        data.append('nonce', the_ajax_script.nonce );
        data.append('metadata', JSON.stringify(metas) );
    
    function handelFetch () {

        fetch( 
            ROOT_URL_HELLOASSO ,
            { 
            method: 'POST',
            body: data,
            headers: {
                'X-WP-Nonce': the_ajax_script.rootNonce
            }
            })
            .then( res => res.json()  )
            .then( json => { 
                console.log(json);
                setUser( json );
            } )
            .catch( error => { console.log(error) } )

    }


    return [user,handelFetch];


}
export default useFetch;