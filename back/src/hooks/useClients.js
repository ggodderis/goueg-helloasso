import { useState } from 'react';

const useClients = () => {
    const BACK_URL_HELLOASSO = the_ajax_script.rootUrl + "back-helloasso/v1/get_clients";
    const [clients,setClients] = useState();

    function handelClients ( year = '', month = '' ) {
        /**
         * Pour forcer l'affichage du load
         */
        setClients([]);
        
        const data = new FormData();
            data.append('nonce', the_ajax_script.nonce );
            data.append('year', year);
            data.append('month', month);

        fetch( 
            BACK_URL_HELLOASSO ,
            { 
            method: 'POST',
            body: data,
            headers: {
                'X-WP-Nonce': the_ajax_script.rootNonce
            }
            })
            .then( res => res.json()  )
            .then( json => { 
                //console.log(json);
                setClients(json);
            } )
            .catch( error => { console.log(error) } )
            

    }

    return [clients,handelClients];
}
export default useClients;