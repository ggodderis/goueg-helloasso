import { React, useEffect, useState } from 'react';
import useSetTarifs from '../hooks/useSetTarifs';

const BlockTarif = (props) => {
    /**
     * Hook pour updater les informations
     */
    const [tarifs,handelTarifs] = useSetTarifs();
    /**
     * @param etat pour afficher la vue modifiable ou non
     * @param change pour savoir si il y a eu vraiment un changement
     * dans le formulaire ça minimise les appels pour rien...
     */
    const [etat,setEtat] = useState(false);
    const [change,setChange] = useState(false);
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
            secteur: item.secteur
        });

    const handelModif = (event) => {
        setEtat(true);
    }
    const handelSubmit = (event) => {
        event.preventDefault();

        const champs = new FormData( event.target );
        const new_infos = Object.fromEntries(champs);

        /**
         * Ici il faut faire appel un webservice pour UPDATER les infos
         * et au retour on met à jour les modifs avec setInfos
         */
        if( change ){      
            handelTarifs(new_infos);
            setInfos(new_infos);
            setChange(false);
        }
        
        setEtat(false);
    }
    const handelRealChange = (event) => {
        setChange(true);
    }


    return(
<>
        { 
        etat ? (
        <div className="module_tarifs">
            <h4>{infos.titre}</h4>
            <form onSubmit={handelSubmit} onChange={handelRealChange} >
                <input type="hidden" name="id" value={infos.id} />
                <input type="hidden" name="titre" value={infos.titre} />
                <input type="hidden" name="type_licence" value={infos.type_licence} />
                <input type="hidden" name="secteur" value={infos.secteur} />
            <label><span>Description:</span><input type="text" name="descriptif" defaultValue={infos.descriptif} /></label>
            {/* <span>Type d'adhésion: {item.type_licence}</span> */}
            <p>ATTENTION!! les tarifs doivent être en centimes...</p>
            <label><span>Plein tarif:</span><input type="text" name="plein_tarif" defaultValue={infos.plein_tarif} /></label>
            <label><span>Demi tarif:</span><input type="text" name="demi_tarif" defaultValue={infos.demi_tarif} /></label>
            <button type="submit">Valider</button>
            </form>
        </div>
        )
        :(
        <div className="module_tarifs">
            <h4>{infos.titre}</h4>
            <span><b>{infos.descriptif}</b></span>
            <span>Type d'adhésion: <b>{infos.type_licence}</b></span>
            <span>Plein tarif: <b>{infos.plein_tarif/100}€</b></span>
            <span>Demi tarif: <b>{infos.demi_tarif/100}€</b></span>
            <button type="button" onClick={handelModif}>Modifier</button>
        </div>
        )
        }        
</>
    )
}
export default BlockTarif;