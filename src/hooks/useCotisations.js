import { React, useEffect, useState } from 'react';

const useCotisations = () => {

    const [liste,setListe] = useState([]);
    const ROOT_URL_HELLOASSO = the_ajax_script.rootUrl + "goueg-helloasso/v1/set_cotisations";
    
    const data = new FormData();
        data.append('nonce', the_ajax_script.nonce );
        //data.append('metadata', JSON.stringify(metas) );
    
    function handelCotisation ( dateBirthday ) {

        data.append('date', dateBirthday );

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
                console.log( json );
                setListe( json.club );
            } )
            .catch( error => { console.log(error) } )

    }

    return[liste,handelCotisation];

}
export default useCotisations;