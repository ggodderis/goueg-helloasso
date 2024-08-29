import { useState } from 'react';

const useEmail = () => {
    
    const ROOT_URL_HELLOASSO = the_ajax_script.rootUrl + "goueg-helloasso/v1/user_email";
    const [isexist,setIsexist] = useState('');
    
    const data = new FormData();
        //data.append('nonce', the_ajax_script.nonce );
        //data.append('metadata', JSON.stringify(metas) );
    
    function handelUserEmail ( userEmail = 'test@test.com' ) {
        data.append('email', userEmail );

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
                setIsexist(json.email);
            } )
            .catch( error => { console.log(error) } )
    }

    return [isexist,handelUserEmail];

}
export default useEmail;