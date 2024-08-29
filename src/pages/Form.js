import { React, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import useEmail from '../hooks/useEmail';

const Form = (props) => {

    const {nav,setNav,user,handelDatas} = props;
    const [isexist,handelUserEmail] = useEmail();
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
/** */

    useEffect( () => {

        if( isexist === false ){
            navigate('/cotisation');
        }else{
            console.log('Adhérent déjà présent !!!!');
        }
    },[isexist]);

    const handelSubmit = (event) => {
        event.preventDefault();

        let champs = new FormData( event.target );
        let adherent = Object.fromEntries(champs);

        handelUserEmail( adherent.email );
        handelDatas('adherent', adherent );

    }
    
    return(
        <form onSubmit={handelSubmit} className="form_inscription">

            <h2>Formulaire d'adhésion au club</h2>

            <div className="label_ligne">
                <label>Votre nom:
                    <input type="text" name="lastName" id="lastName" defaultValue={user.lastName} required />
                </label>
                <label>Votre prenom:
                    <input type="text" name="firstName" id="firstName" defaultValue={user.firstName} required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre email:
                    <input type="email" name="email" id="email" defaultValue={user.email} required />
                </label>
                <label>Votre Téléphone:
                    <input type="tel" name="billing_phone" id="billing_phone" defaultValue={user.billing_phone} required />
                </label>
            </div>

            <div className="label_ligne">
                <div>Votre genre:
                    <div>
                        <label><input type="radio" value="f" name="gda_genre" defaultChecked={user.gda_genre === 'f'} required />Femme</label>
                        <label><input type="radio" value="h" name="gda_genre" defaultChecked={user.gda_genre === 'h'} />Homme</label>
                    </div>
                </div>
                <label>Votre date de naissance:
                    <input type="date" name="dateOfBirth" id="dateOfBirth" defaultValue={user.dateOfBirth} required />
                </label>
            </div>

            <div className="label_adresse">
                <label>Votre adresse:
                    <input type="text" name="address" id="address" defaultValue={user.address} required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre ville:
                    <input type="text" name="city" id="city" defaultValue={user.city} required />
                </label>
                <label>Votre code postal:
                    <input type="text" name="zipCode" id="zipCode" defaultValue={user.zipCode} required />
                </label>
            </div>

            <h3>Personne à prévenir en cas de problème:</h3>

            <div className="label_ligne">
                <label>Nom de la personne:
                    <input type="text" name="gda_personne" id="gda_personne" defaultValue={user.gda_personne} required />
                </label>
                <label>Téléphone de la personne:
                    <input type="tel" name="gda_tel_personne" id="gda_tel_personne" defaultValue={user.gda_tel_personne} required />
                </label>
            </div>

            <button type="submit">Valider</button>

        </form>
    )
}
export default Form;