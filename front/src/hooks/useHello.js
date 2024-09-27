/**
 * Hook qui appel Checkout Hellasso
 * et lui envoie les datas
 */
import { React, useState, useEffect } from "react";

const useHello = () => {

  const ROOT_INSERT = the_ajax_script.rootUrl + "goueg-helloasso/v1/set_session";

  const [token,setToken] = useState('');
  const [datas,setData] = useState( null );
  const [url,setUrl] = useState('');

  /**
   * Si on l'url de checkout existe alors on lance l'insert dans la table wp_clients
   * et on redirige vers l'API hello Asso
   */
  useEffect( () => {

    //console.log(url);
    

    if( url.id ){

      const data = new FormData();
            data.append('datas',JSON.stringify(datas));
            data.append('id_hello',url.id);

      fetch( 
        ROOT_INSERT ,
        { 
        method: 'POST',
        body: data,
        headers: {
            'X-WP-Nonce': the_ajax_script.rootNonce
        }
        })
        .then( res => res.json()  )
        .then( json => {
            /**
             * Redirection vers le paiement Hello Asso checkout
             */
            window.location.href = url.redirectUrl;
        } )
        .catch( error => { console.log(error) } )

    }
    
    
    
  },[url]);

  /**
   * Si on a un token on appel Hello pour obtenir l'url
   * de paiement et l'id..
   */
  useEffect( () => {
 
    if( token !== ''){

      fetch("https://api.helloasso-sandbox.com/v5/organizations/goueg/checkout-intents", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          "authorization": "Bearer "+token
        },
        body: JSON.stringify(datas)
        //.toString()
      })
        .then((response) => response.json())
        .then((data) => {
          setUrl( data );
        })
        .catch((error) => console.log(error));
        

    }else{
      //console.log(' on fait rien on attend...');
    }


  } ,[token]);

  const startPaye = (datas) => {
    setData(datas);
  }
/**
 * Si datas est plein...
 * on appel l'api helloasso pour obtenir le token
 */

const keys = new FormData();
      keys.append("client_id","a0fead5a1ba4404eacf4b9de755fb3b9");
      keys.append("client_secret","NOfvEhtPEa4CBhrom8Q6nkBIwcZOapxr");
      keys.append("grant_type","client_credentials");

    useEffect( () => {

      if( datas ){

        fetch("https://api.helloasso-sandbox.com/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(keys).toString()
          //.toString()
        })
          .then((response) => response.json())
          .then((data) => {
            setToken(data.access_token);
          })
          .catch((error) => console.log(error));
        
      }
      
    },[datas]);


    return [token,startPaye];
}
export default useHello;