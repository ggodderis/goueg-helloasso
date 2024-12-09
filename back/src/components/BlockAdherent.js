import { React, useEffect, useState } from 'react';
import ListeMembres from './ListeMembres';
import LicenceAssurance from './LicenceAssurance';

const BlockAdherent = (props) => {

    const {metadata} = props.metas;

    return (
        <div key={props.id} className="ligne_client">
            <div className="cellule_titre">
                {/* <span>{props.hello_id}</span> */}
                <h2>{props.metas.metadata?.payer.lastName} - {props.metas.metadata?.payer.firstName}</h2>
                <small>id hello asso: {props.hello_id}</small>
                <span>Date du paiement: {props.date_create}</span>
                <span className="cellule_statut">Statut du paiement: <b>{props.statut}</b></span>
            </div>

            <div className="contant_cellules">

                <div className="cellule_client">
                    <h4>Cotisation club</h4>
                    <span>Cotisation club: <b>{props.metas.metadata?.cotisation}</b></span>
                    <span>Type: <b>{props.metas.metadata?.cotisation_famille}</b></span>
                    <span>Prix: <b>{ props.metas.metadata?.tarif_cotisation/100 } €</b></span>
                    <span>Mur d'escalade: <b>{ props.metas.metadata?.mur/100 } €</b></span>
                    <span>Soutien: <b>{ props.metas.metadata?.soutien/100 } €</b></span>
                </div>
                {
                    metadata != undefined ? (
                        <>
                            <LicenceAssurance {...metadata} />
                            <ListeMembres {...metadata} />
                        </>
                    ):('')
                }
                
            </div>

        </div>
    )
}
export default BlockAdherent;