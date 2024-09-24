import { React, useEffect, useState } from 'react';

const useFetch = () => {

    const [liste,setListe] = useState([]);
    
    const ROOT_URL_HELLOASSO = the_ajax_script.rootUrl + "goueg-helloasso/v1/set_datas";
    
    const data = new FormData();
        //data.append('nonce', the_ajax_script.nonce );
        //data.append('metadata', JSON.stringify(metas) );
    
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
                setListe( json );
            } )
            .catch( error => { console.log(error) } )

    }


    return [liste,handelFetch];


}
export default useFetch;