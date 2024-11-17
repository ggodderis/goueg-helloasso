import { useState } from 'react';

const useCotisations = () => {

    const [liste,setListe] = useState([]);
    const ROOT_URL_HELLOASSO = REACT_VARS.rootUrl + "goueg-helloasso/v1/set_cotisations";
    
    const data = new FormData();
        data.append('nonce', REACT_VARS.nonce );
        //data.append('metadata', JSON.stringify(metas) );
    
    function handelCotisation ( dateBirthday ) {

        data.append('date', dateBirthday );

        fetch( 
            ROOT_URL_HELLOASSO ,
            { 
            method: 'POST',
            body: data,
            headers: {
                'X-WP-Nonce': REACT_VARS.rootNonce
            }
            })
            .then( res => res.json()  )
            .then( json => { 
                console.log( json );
                setListe( json );
            } )
            .catch( error => { console.log(error) } )

    }

    return[liste,handelCotisation];

}
export default useCotisations;