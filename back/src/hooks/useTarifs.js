import { useState } from 'react';

const useTarifs = () => {

    const BACK_URL_HELLOASSO = REACT_VARS.rootUrl + "back-helloasso/v1/get_tarifs";
    const [tarifs,setTarifs] = useState();
        
    function handelTarifs () {
        console.log( BACK_URL_HELLOASSO );
        
        const data = new FormData();
        data.append('nonce', REACT_VARS.nonce );

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
                setTarifs(json);
            } )
            .catch( error => { console.log(error) } )
            

    }

    return[tarifs,handelTarifs];

}
export default useTarifs;