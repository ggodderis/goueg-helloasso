
import { React, useEffect, useState } from 'react';
import { paysListe } from '../datas/paysListe';

const FormMembre = (props) => {

const {legend,handelSuppMembre,monid,isMobile} = props;
const [etat,setEtat]= useState(isMobile);
const [titre,setTitre] = useState('');

const handelSubmit = (event) => {
    event.preventDefault();
}
const suppMembre = (event) => {
    handelSuppMembre(monid);
}

    return(
        <form onSubmit={handelSubmit} className="form_inscription">

        <fieldset className="fieldset_grey">
        <legend>
           {legend}
        </legend>

            <div className="label_ligne">
                <label>Nom:
                    <input type="text" name="lastName" id="lastName" defaultValue="" required />
                </label>
                <label>Prénom:
                    <input type="text" name="firstName" id="firstName" defaultValue="" required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Email:
                    <input type="email" name="email" id="email" defaultValue="" required />
                </label>
                <label>Téléphone:
                    <input type="tel" name="billing_phone" id="billing_phone" defaultValue="" required />
                </label>
            </div>

            <div className="label_ligne">
                <div>Genre:
                    <div>
                        <label><input type="radio" value="f" name="gda_genre" defaultChecked="" required />Femme</label>
                        <label><input type="radio" value="h" name="gda_genre" defaultChecked="" />Homme</label>
                    </div>
                </div>
                <label>Date de naissance:
                    <input type="date" name="dateOfBirth" id="dateOfBirth" defaultValue="" required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Lieu de naissance:
                    <input type="text" name="gda_lieu" id="gda_lieu" defaultValue="" required />
                </label>
                <label>Nationalité:
                    <select name="country" defaultValue='FRA'>
                        {
                            paysListe.map( (item,i) => (
                                <option value={item.value}>{item.land}</option>
                            ))
                        }
                    </select>
                </label>
            </div>

            {/* <div className="label_adresse">
                <label>Votre adresse:
                    <input type="text" name="address" id="address" defaultValue="" required />
                </label>
            </div>

            <div className="label_ligne">
                <label>Votre ville:
                    <input type="text" name="city" id="city" defaultValue="" required />
                </label>
                <label>Votre code postal:
                    <input type="text" name="zipCode" id="zipCode" defaultValue="" required />
                </label>
            </div> */}
           
            <h4 className="hello_h4">Personne à prévenir en cas de problème:</h4>

            <div className="label_ligne">
                <label>Nom de la personne:
                    <input type="text" name="gda_personne" id="gda_personne" defaultValue="" required />
                </label>
                <label>Téléphone de la personne:
                    <input type="tel" name="gda_tel_personne" id="gda_tel_personne" defaultValue="" required />
                </label>
            </div>

                <div className="navig_bottom">
                {
                    etat === 'mobile' ? ( <button type="button" onClick={suppMembre} className='bt_supprimer'>x Supprimer</button>):('')
                }
                <button type="submit" className='bt_vert'><i className="icon-valider"></i>&nbsp;Valider</button>
                </div>

            </fieldset>


        </form>
    )

}
export default FormMembre;