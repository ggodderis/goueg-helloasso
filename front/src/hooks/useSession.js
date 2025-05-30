import { useState } from 'react';

const useSession = () => {

    const ROOT_URL_HELLOASSO = REACT_VARS.rootUrl + "goueg-helloasso/v1/set_session";
    const [session,setSession] = useState(null);

    const saveDatasSession = ( datas ) => {

        const data = new FormData();
            data.append('datas', JSON.stringify(datas) );

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
                
            } )
            .catch( error => { console.log(error) } )

    }

    return[session,saveDatasSession];
}
export default useSession;