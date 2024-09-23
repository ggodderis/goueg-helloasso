import { React, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import useEmail from '../hooks/useEmail';
import { paysListe } from '../datas/paysListe';

const Form = (props) => {
    /**
     * @param isexist Boolean pour savoir si l'email existe déjà dans les comptes adhérent
     */
    const {nav,setNav,user,handelDatas,setNouveau} = props;
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
        
        setNouveau('nouveau');

    }, []);
/** */

    useEffect( () => {
        
        if( isexist === false ){
            navigate('/cotisation');
        }else if (isexist === '') {
            console.log('début …');
        }else{
            alert(`l\'email ${user.email} existe déjà dans nos comptes d\'adhérents !!`);
        }
        
    },[isexist]);

    function handelClickPrecedente(event){
        //console.log('validation', event.target, club );
        nav.map( (item,i) => {
            
            if( item.label == 'Formulaire') {
                let index = i-1;
               navigate( nav[index].to );
            }
            
        })
    }

    const handelSubmit = (event) => {
        event.preventDefault();

        let champs = new FormData( event.target );
        let adherent = Object.fromEntries(champs); 
        
        handelUserEmail( adherent.email );
        handelDatas('adherent', adherent );

    }
    
    return(
        <>
        <div className="bandeau_haut">
            <span className="bandeau_haut_titre">Formulaire d'adhésion au club</span>
        </div>
        <form onSubmit={handelSubmit} >
        
        <div>
        <fieldset className="adherent_grid">
        {/* <legend>Formulaire d'adhésion au club</legend> */}

            <div className="label_ligne">
                <label>Votre nom:
                    <input type="text" name="lastName" id="lastName" placeholder="Votre nom de famille" defaultValue={user.lastName} required />
                </label>
                <label>Votre prénom:
                    <input type="text" name="firstName" id="firstName" placeholder="Votre prénom" defaultValue={user.firstName} required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre email:
                    <input type="email" name="email" id="email" placeholder="Votre email" defaultValue={user.email} required />
                </label>
                <label>Votre Téléphone:
                    <input type="tel" name="billing_phone" id="billing_phone" placeholder="Votre numéro de téléphone"  defaultValue={user.billing_phone} required />
                </label>
            </div>

            <div className="label_ligne">
                <div>Votre genre:
                    <div>
                        <label key="1"><input type="radio" value="f" name="gda_genre" defaultChecked={user.gda_genre === 'f'} required />Femme</label>
                        <label key="2"><input type="radio" value="h" name="gda_genre" defaultChecked={user.gda_genre === 'h'} />Homme</label>
                    </div>
                </div>
                <label>Votre date de naissance:
                    <input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="Votre date de naissance" defaultValue={user.dateOfBirth} required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre lieu de naissance:
                    <input type="text" name="gda_lieu" id="gda_lieu" placeholder="Votre lien de naissance" defaultValue={user.gda_lieu} required />
                </label>
                <label key="pays">Votre nationalité:
                    <select name="country" defaultValue={user.country || "FRA"}>
                        {
                            paysListe.map( (item,i) => (
                                <option key={i} value={item.value}>{item.land}</option>
                            ))
                        }
                    </select>
                </label>
            </div>

            <div className="label_adresse">
                <label>Votre adresse:
                    <input type="text" name="address" placeholder="Votre adresse" id="address" defaultValue={user.address} required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre ville:
                    <input type="text" name="city" id="city" placeholder="Votre ville" defaultValue={user.city} required />
                </label>
                <label>Votre code postal:
                    <input type="text" name="zipCode" id="zipCode" placeholder="Votre code postal" defaultValue={user.zipCode} required />
                </label>
            </div>
            </fieldset>

            <fieldset>
            <legend>Personne à prévenir en cas de problème:</legend>

            <div className="label_ligne">
                <label>Nom de la personne:
                    <input type="text" name="gda_personne" id="gda_personne" placeholder="Nom de la personne" defaultValue={user.gda_personne} required />
                </label>
                <label>Téléphone de la personne:
                    <input type="tel" name="gda_tel_personne" id="gda_tel_personne" placeholder="Téléphone de la personne" defaultValue={user.gda_tel_personne} required />
                </label>
            </div>
            </fieldset>

            </div>

            <div className="navig_bottom">
                <button type="button" className='bt_bleu_outline' onClick={handelClickPrecedente}><i className="icon-chevron-gauche"></i>&nbsp;Étape précédente</button>
                <button type="submit" className='bt_bleu'>Étape suivante&nbsp;<i className="icon-chevron-droite"></i></button>
            </div>

        </form>
        </>
    )
}
export default Form;