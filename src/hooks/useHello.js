import { React, useState, useEffect } from "react";

const useHello = () => {

  const [token,setToken] = useState('');
  const [datas,setData] = useState( null );
  const [url,setUrl] = useState('');

  useEffect( () => {
    if( url != '' ){
      window.location.href = url;
    }
    
  },[url]);

  /**
   * Si on a un token on appel Hello pour obtenir l'url
   * de paiement..
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
          console.log( data, );
          setUrl(data.redirectUrl);
        })
        .catch((error) => console.log(error));
        

    }else{
      console.log(' on fait rien on attend...');
      
    }
  } ,[token]);



  const keys = new FormData();
  keys.append("client_id","a0fead5a1ba4404eacf4b9de755fb3b9");
  keys.append("client_secret","NOfvEhtPEa4CBhrom8Q6nkBIwcZOapxr");
  keys.append("grant_type","client_credentials");

  const startPaye = (datas) => {
    setData(datas);
  }
/**
 * Si datas est plein...
 * on appel l'api helloasso pour obtenir le token
 */
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