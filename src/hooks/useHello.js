import React, { useState, useEffect } from "react";

const useHello = () => {

  const [data,setData] = useState( {
          totalAmount: 6000,
          initialAmount: 6000,
          itemName: 'Adhésion au club Grimpeurs des Alpes',
          backUrl: 'https://www.club-montagne.net/helloasso/back.php', 
          errorUrl: 'https://www.club-montagne.net/helloasso/error.php', 
          returnUrl: 'https://www.club-montagne.net/helloasso/return.php', 
          containsDonation: true, 
          payer: {
            firstName:'Frédéric',
            lastName: 'Brand',
            email: 'fbrand@orange.fr',
            dateOfBirth: '1975-09-03',
            address: '268, chemin des Traversières',
            city: 'Les Adrets',
            zipCode: '38190',
            country: 'FRA',
            companyName: ''
          },
          metadata: {}
  } );

  const [token,setToken] = useState('');

  useEffect( () => {
    
    if( token !== ''){

      fetch("https://api.helloasso-sandbox.com/v5/organizations/goueg/checkout-intents", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          "authorization": "Bearer "+token
        },
        body: JSON.stringify(data)
        //.toString()
      })
        .then((response) => response.json())
        .then((data) => {
          console.log( data );
          
        })
        .catch((error) => console.log(error));
        

    }else{
      console.log(' on fait rien on attend...');
      
    }
  } ,[token]);

    // const joke = {
    //     client_id:"a0fead5a1ba4404eacf4b9de755fb3b9",
    //     client_secret:"NOfvEhtPEa4CBhrom8Q6nkBIwcZOapxr",
    //     grant_type:"client_credentials"
    // };

    const datas = new FormData();
    datas.append("client_id","a0fead5a1ba4404eacf4b9de755fb3b9");
    datas.append("client_secret","NOfvEhtPEa4CBhrom8Q6nkBIwcZOapxr");
    datas.append("grant_type","client_credentials");

    console.log( new URLSearchParams(datas) );



    useEffect(() => {

        fetch("https://api.helloasso-sandbox.com/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(datas).toString()
          //.toString()
        })
          .then((response) => response.json())
          .then((data) => {
            setToken(data.access_token);
          })
          .catch((error) => console.log(error));
      }, []);



    return(
        <h1>Hello...</h1>
    );
}
export default useHello;