import { useState } from 'react';

const useClients = () => {
    const BACK_URL_HELLOASSO = REACT_VARS.rootUrl + "back-helloasso/v1/get_clients";
    const [clients,setClients] = useState();

    function handelClients ( year = '', month = '' ) {
        /**
         * Pour forcer l'affichage du load
         */
        setClients([]);
        
        const data = new FormData();
            data.append('nonce', REACT_VARS.nonce );
            data.append('year', year);
            data.append('month', month);

        fetch( 
            BACK_URL_HELLOASSO ,
            { 
            method: 'POST',
            body: data,
            headers: {
                'X-WP-Nonce': REACT_VARS.rootNonce
            }
            })
            .then( res => res.json()  )
            .then( json => { 
                // console.log(json);
                setClients(json);
            } )
            .catch( error => { console.log(error) } )
            

    }

    return [clients,handelClients];
}
export default useClients;