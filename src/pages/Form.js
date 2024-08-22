import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Form = (props) => {

    const {nav,setNav} = props;
    const navigate = useNavigate();

/**
 * On regarde si le label Formulaire existe dans nav
 * si il n'existe pas on l'ajoute
 */
    function trouve( name ){
        return nav.find( (nav) => nav.label === name );
    }

    useEffect( () => {

        if( trouve('Formulaire') === undefined ){
            setNav([...nav,
                { to: '/formulaire', label: 'Formulaire'}
            ]);
        }

    }, []);


    const handelSubmit = (event) => {
        event.preventDefault();
        console.log( event );
        navigate('/cotisation');
    }
    
    return(
        <form onSubmit={handelSubmit} className="form_inscription">

            <h2>Formulaire d'inscription</h2>

            <div className="label_ligne">
                <label>Votre nom:
                    <input type="text" name="lastName" id="lastName" defaultValue='' required />
                </label>
                <label>Votre prenom:
                    <input type="text" name="firstName" id="firstName" defaultValue='' required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre email:
                    <input type="email" name="email" id="email" defaultValue='' required />
                </label>
                <label>Votre Téléphone:
                    <input type="tel" name="billing_phone" id="billing_phone" defaultValue='' required />
                </label>
            </div>

            <div className="label_ligne">
                <div>Votre genre:
                    <div>
                        <label><input type="radio" value="f" name="gda_genre" />Femme</label>
                        <label><input type="radio" value="h" name="gda_genre" />Homme</label>
                    </div>
                </div>
                <label>Votre date de naissance:
                    <input type="date" name="dateOfBirth" id="dateOfBirth" defaultValue='' required />
                </label>
            </div>

            <div className="label_adresse">
                <label>Votre adresse:
                    <input type="text" name="address" id="address" defaultValue='' required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre ville:
                    <input type="text" name="city" id="city" defaultValue='' required />
                </label>
                <label>Votre code postal:
                    <input type="text" name="zipCode" id="zipCode" defaultValue='' required />
                </label>
            </div>

            <h3>Personne à prévenir en cas de problème:</h3>

            <div className="label_ligne">
                <label>Nom de la personne:
                    <input type="text" name="gda_personne" id="gda_personne" defaultValue='marnie godderis' required />
                </label>
                <label>Téléphone de la personne:
                    <input type="tel" name="gda_tel_personne" id="gda_tel_personne" defaultValue='0660251254' required />
                </label>
            </div>

            <button type="submit">Valider</button>

        </form>
    )
}
export default Form;