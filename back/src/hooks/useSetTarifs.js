import { useState } from 'react';

const useSetTarifs = () => {

    const BACK_URL_HELLOASSO = the_ajax_script.rootUrl + "back-helloasso/v1/set_tarifs";
    const [tarifs,setTarifs] = useState();
        
    function handelTarifs ( datas = '' ) {
        
        const data = new FormData();
        data.append('nonce', the_ajax_script.nonce );
        data.append('data', JSON.stringify(datas) );

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
                console.log(json);
            } )
            .catch( error => { console.log(error) } )
            

    }

    return[tarifs,handelTarifs];

}
export default useSetTarifs;