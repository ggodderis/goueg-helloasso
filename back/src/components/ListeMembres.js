import { React, useEffect, useState } from 'react';
import PopupFamille from './PopupFamille';
import usePdfFamille from "../hooks/usePdfFamille";
import telechargement from '../assets/telechargement.svg';

const ListeMembres = (props) => {

    const {payer,famille_adulte,famille_enfant,famille_supp} = props;
    /**
     * Hook pour appeler la rest route PDF
     */
    const [handelPdf] = usePdfFamille();

    const handelToPdf = ( ) => {
        handelPdf( payer, famille_adulte,famille_enfant,famille_supp );
    }

    if( Object.keys(famille_adulte).length === 0 ) return false;
    
    return(
        <div className="cellule_client">
            <h4>Membres de la famille</h4>
            <span>{ famille_adulte?.firstName } { famille_adulte?.lastName }</span>
            <span>{ famille_enfant?.firstName } { famille_enfant?.lastName }</span>
            {
                famille_supp.map( (item,i) => (
                    <span>{ item?.firstName } { item?.lastName } </span>
                ))
            }
            <br />
            <button className="export_csv" onClick={ (event) => handelToPdf() }>
                <img src={telechargement} />
                Infos membres (PDF)
            </button>
        </div>
    )
}
export default ListeMembres;