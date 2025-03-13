import { React, useEffect, useState } from 'react';
import useSetTarifs from '../hooks/useSetTarifs';

const BlockTarif = (props) => {
    /**
     * Hook webservice pour updater les informations
     */
    const [tarifs,handelTarifs] = useSetTarifs();
    
    /**
     * @param etat pour afficher la vue modifiable ou non
     * @param change pour savoir si il y a eu vraiment un changement
     * dans le formulaire ça minimise les appels pour rien...
     */
    const [etat,setEtat] = useState(false);
    /**
     * 
     */
    const {item} = props;
    const [infos,setInfos] = useState({
            id: item.id,
            titre: item.titre,
            type_licence: item.type_licence,
            descriptif: item.descriptif,
            plein_tarif: item.plein_tarif,
            demi_tarif: item.demi_tarif,
            secteur: item.secteur,
            active: item.active
        });

    const handelModif = (event) => {
        setEtat(true);
    }
    const handelSubmit = (event) => {
        event.preventDefault();

        const champs = new FormData( event.target );
        const new_infos = Object.fromEntries(champs);
        
        /**
         * Ici on test si il y a un vrai changement sur les valeurs
         * pour savoir si on UPDATE les infos ... évite les appels API pour rien..
         */
        if( new_infos.descriptif !=  infos.descriptif || 
            new_infos.plein_tarif != infos.plein_tarif || 
            new_infos.demi_tarif != infos.demi_tarif || 
            new_infos.active != infos.active){

            console.log("Y a une différence...on Update");
            
            handelTarifs(new_infos);
            setInfos(new_infos);
        }
        
        setEtat(false);
    }


    return(
<>
        { 
        etat ? (
        <div className="module_tarifs">
            <h4>{infos.titre}</h4>
            <form onSubmit={handelSubmit}>
            <input type="hidden" name="id" value={infos.id} />
            <input type="hidden" name="titre" value={infos.titre} />
            <input type="hidden" name="type_licence" value={infos.type_licence} />
            <input type="hidden" name="secteur" value={infos.secteur} />
            {
                infos.titre == 'mur' ? (
                <label className="active_input_mur">
                    <span>Activer le champs mur d'esclade:</span>
                    <div className="ct_input_active">
                        <label><input type="radio" name="active" value="oui" defaultChecked={infos.active == 'oui' ? 'checked' : ''} />oui</label>
                        <label><input type="radio" name="active" value="non" defaultChecked={infos.active == 'non' ? 'checked' : ''} />non</label>
                    </div>
                </label>
                ):('')
            }
            <label><span>Description:</span><input type="text" name="descriptif" defaultValue={infos.descriptif} /></label>
            {/* <span>Type d'adhésion: {item.type_licence}</span> */}
            <p>ATTENTION!! les tarifs doivent être en centimes...</p>
            <label><span>Plein tarif:</span><input type="text" name="plein_tarif" defaultValue={infos.plein_tarif} /></label>
            {
                infos.secteur !="options" ?( <label><span>Demi tarif:</span><input type="text" name="demi_tarif" defaultValue={infos.demi_tarif} /></label>):('')
            }
            <div className="nav_bottom"><button type="submit" className="bt_valider_modif">&#10004;&nbsp;Valider</button></div>
            </form>
        </div>
        )
        :(
        <div className="module_tarifs">
            <h4>{infos.titre}</h4>
            {
                infos.titre == 'mur' ? (
                    ( infos.active == 'oui' )? <span className="green"><b>Activé</b></span> : <span className="red"><b>Désactivé</b></span>
                ):('')
            }
            <span><b>{infos.descriptif}</b></span>
            {
                infos.type_licence ? ( <span>Type d'adhésion:&nbsp;<b>{infos.type_licence}</b></span> ) 
                : ('')
            }
            <span>Plein tarif:&nbsp;<b>{infos.plein_tarif/100}€</b></span>
            {
                 infos.secteur != "options" ? (<span>Demi tarif:&nbsp;<b>{infos.demi_tarif/100}€</b></span>):('')
            }
            <div className="nav_bottom"><button type="button" className="bt_modifier" onClick={handelModif}>Modifier</button></div>
        </div>
        )
        }        
</>
    )
}
export default BlockTarif;