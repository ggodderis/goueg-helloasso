/**
 * Hook qui appel Checkout Hellasso
 * et lui envoie les datas
 */
import { React, useState, useEffect } from "react";

const useHello = () => {

  const ROOT_INSERT = REACT_VARS.rootUrl + "goueg-helloasso/v1/set_session";
  const ROOT_TOKEN = REACT_VARS.url_token;
  const ROOT_CHECKOUT_INTENTS = REACT_VARS.url_checkout_intents;
  const CLIENT_ID = REACT_VARS.client_id;
  const CLIENT_SECRET = REACT_VARS.client_secret;



  const [token,setToken] = useState('');
  const [datas,setData] = useState( null );
  const [url,setUrl] = useState('');

  const startPaye = (datas) => {
    setData(datas);
  }

/**
 * Si datas est plein...
 * on appel l'api helloasso pour obtenir le token
 */
  const keys = new FormData();
      keys.append("client_id",CLIENT_ID);
      keys.append("client_secret",CLIENT_SECRET);
      keys.append("grant_type","client_credentials");

    useEffect( () => {

      if( datas ){

        fetch( ROOT_TOKEN, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(keys).toString()
          //.toString()
        })
          .then((response) => response.json())
          .then((data) => {
            console.log( 'useHello', data.access_token );
            setToken(data.access_token);
          })
          .catch((error) => console.log(error));
        
      }
      
    },[datas]);

/**
   * Si on a un token on appel Hello pour obtenir l'url
   * de paiement et l'id..
   */
  useEffect( () => {

    if( token !== ''){

      fetch( ROOT_CHECKOUT_INTENTS , {
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

/**
   * Si l'url de checkout existe alors on lance l'insert dans la table wp_clients
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
            'X-WP-Nonce': REACT_VARS.rootNonce
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


    return [token,startPaye];
}
export default useHello;