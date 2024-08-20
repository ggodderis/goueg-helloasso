import { React, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const Home = ({user,handelFetch}) => {

    useEffect( () => {
        if( user.firstName ){
            handelFetch();
        }
    },[user]);
    //console.log( user, user.firstName, user.lastName );
    // [user].map( item => {
    //     console.log(item.firstName,user.lastName,user.dateOfBirth);
        
    // })
    //const [user,handelFetch] = useFetch();
 
    // const ROOT_URL_HELLOASSO = the_ajax_script.rootUrl + "goueg-helloasso/v1/set_datas";
   //  const [user,setUser] = useState({});

    // useEffect ( () => {

    //     if( user.dateOfBirth ){
    //         console.log( user.dateOfBirth, 'on fait un appel pour avoir la liste des cotisation et assurances' );
    //     }else{
    //         console.log(' on fait rien ..');
            
    //     }
    // },[user])

    return(
        <>
        <h1>Adhésion au club</h1>
        {
            user.firstName ? (
                <>
                <span>Bonjour, {user.firstName} {user.lastName}</span>
                <br />
                <Link key="1" to="/cotisation" >Renouveler mon adhésion</Link>
                <br />
                <a href={"/wp-login.php?action=logout&_wpnonce="+the_ajax_script.logoutNonce+"&redirect_to=page-d-exemple"}>
                    Me connecter avec un autre compte
                </a>
                </>
            ):(
                <>
                <h2>Je suis déjà adhérent</h2>
                <a href="/member-login?redirect_to=page-d-exemple">connexion</a>
                <h2>Je suis nouveau adhérent</h2>
                <a href="/member-login?redirect_to=page-d-exemple">connexion</a>
                </>
            )
        }
        
        </>
    )
}
export default Home;