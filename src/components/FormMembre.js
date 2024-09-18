import { React, useEffect, useState } from 'react';
import { paysListe } from '../datas/paysListe';
import Modifieur from './Modifieur';

const FormMembre = (props) => {

/**
 * @param etat pour savoir si ce formulaire est supprimable
 * @param infos [ toutes les informations du formulaire ]
 */

const {legend,famille_supp,famille_adulte,famille_enfant,handelSuppMembre,handelDatas,monid,isReset} = props;
const [etat,setEtat] = useState(isReset);
const [titre,setTitre] = useState('');
const [infos,setInfos] = useState({});
const [modifier,setModifier] = useState(false);


useEffect( () => {
    if( legend === "Adulte"){
        setInfos( famille_adulte );
    }
    if( legend === 'Enfant'){
        setInfos( famille_enfant );
    }
    if( legend === "Membres" ){
        let new_infos = famille_supp.filter( item => item.id === monid );
        setInfos( new_infos[0] );
    }
},[]);

useEffect ( () => {
    if( infos.dateOfBirth != undefined ){
        setModifier(true);
    }
},[infos]);




const handelSubmit = (event) => {
    event.preventDefault();
    const champs = new FormData( event.target );
    const adherent = Object.fromEntries(champs);

    handelDatas(legend,adherent);
}

const suppMembre = (event) => {
    handelSuppMembre(monid);
}

    return(
        <>
        {
        modifier ? ( <Modifieur infos={infos} setModifier={setModifier} /> )
            :(
            <form onSubmit={handelSubmit} className="form_inscription">

            <fieldset className="fieldset_grey">
            <legend>
            {legend}
            </legend>
                {
                    monid ? (<input type="hidden" name="id" value={monid} />):('')
                }
                <div className="label_ligne">
                    <label>Nom:
                        <input type="text" name="lastName" id="lastName" defaultValue={infos.lastName} placeholder="nom de famille" required />
                    </label>
                    <label>Prénom:
                        <input type="text" name="firstName" id="firstName" defaultValue={infos.firstName} placeholder="prénom" required />
                    </label>
                </div>

                <div className="label_ligne">
                    <label>Email:
                        <input type="email" name="email" id="email" defaultValue={infos.email} placeholder="email" required />
                    </label>
                    <label>Téléphone:
                        <input type="tel" name="billing_phone" id="billing_phone" defaultValue={infos.billing_phone} placeholder="numéro de téléphone" required />
                    </label>
                </div>

                <div className="label_ligne">
                    <div>Genre:
                        <div>
                            <label key={infos.lastName}><input type="radio" value="f" name="gda_genre" defaultChecked={infos.gda_genre === 'f'} required />Femme</label>
                            <label key={infos.firstName}><input type="radio" value="h" name="gda_genre" defaultChecked={infos.gda_genre === 'h'} />Homme</label>
                        </div>
                    </div>
                    <label>Date de naissance:
                        <input type="date" name="dateOfBirth" id="dateOfBirth" defaultValue={infos.dateOfBirth} required />
                    </label>
                </div>

                <div className="label_ligne">
                    <label>Lieu de naissance:
                        <input type="text" name="gda_lieu" id="gda_lieu" defaultValue={infos.gda_lieu} placeholder="lieu de naissance" required />
                    </label>
                    <label key={monid}>Nationalité:
                        <select name="country" defaultValue={infos.country || "FRA"}>
                            {
                                paysListe.map( (item,i) => (
                                    <option key={i} value={item.value}>{item.land}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
            
                <h4 className="hello_h4">Personne à prévenir en cas de problème:</h4>

                    <div className="label_ligne">
                        <label>Nom de la personne:
                            <input type="text" name="gda_personne" id="gda_personne" defaultValue={infos.gda_personne} placeholder="nom et prénom" required />
                        </label>
                        <label>Téléphone de la personne:
                            <input type="tel" name="gda_tel_personne" id="gda_tel_personne" defaultValue={infos.gda_tel_personne} placeholder="numéro de téléphone" required />
                        </label>
                    </div>
                
                <div className="navig_bottom">
                    {
                        etat === 'reset' ? ( <button type="button" onClick={suppMembre} className='bt_supprimer'>x Supprimer</button>):('')
                    }
                    <button type="submit" className='bt_vert'><i className="icon-valider"></i>&nbsp;Valider</button>
                </div>
            
            </fieldset>

            </form>
            )
        }
        </>
    )

}
export default FormMembre;