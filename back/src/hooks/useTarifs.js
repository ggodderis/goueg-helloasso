import { useState } from 'react';

const useTarifs = () => {

    const BACK_URL_HELLOASSO = the_ajax_script.rootUrl + "back-helloasso/v1/get_tarifs";
        
    function handelTarifs () {
        console.log( BACK_URL_HELLOASSO );
        
        /*
        const data = new FormData();
        data.append('nonce', the_ajax_script.nonce );

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
                console.log( json );
            } )
            .catch( error => { console.log(error) } )
            */

    }

    return[handelTarifs];

}
export default useTarifs;