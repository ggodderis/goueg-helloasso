import { React, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const Home = () => {

    const [user,handelFetch] = useFetch();
 
    // const ROOT_URL_HELLOASSO = the_ajax_script.rootUrl + "goueg-helloasso/v1/set_datas";
   //  const [user,setUser] = useState({});

    // useEffect( () => {

    //     const data = new FormData();
    //     data.append('nonce', the_ajax_script.nonce );

    //     fetch( 
    //         ROOT_URL_HELLOASSO ,
    //         { 
    //         method: 'POST',
    //         body: data,
    //         headers: {
    //             'X-WP-Nonce': the_ajax_script.rootNonce
    //         }
    //     })
    //     .then( res => res.json()  )
    //     .then( json => { 
    //         console.log(json);
    //         setUser( json );
    //     } )
    //     .catch( error => { console.log(error) } )

    //     } ,[]

    // )
    useEffect( () => {
        handelFetch();
    },[])


    useEffect ( () => {
        console.log( user.user_login );
    },[user])

    return(
        <>
        <h1>HOME PAGE DU CHECKOUT</h1>
        {
            user.user_login ? 
                <>
                <span>Bonjour, {user.user_login}</span>
                <br />
                <Link key="1" to="/cotisation">Renouveler mon adhésion</Link>
                <br />
                <a href={"/wp-login.php?action=logout&_wpnonce="+the_ajax_script.logoutNonce+"&redirect_to=page-d-exemple"}>
                    Me connecter avec un autre compte
                </a>
                </>
            : 
                <a href="/member-login?redirect_to=page-d-exemple">connexion</a>
            
        }
        
        </>
    )
}
export default Home;