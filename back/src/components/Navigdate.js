import { React, useEffect, useState, useRef } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

import telechargement from '../assets/telechargement.svg';

const Navigdate = (props) => {

    const {dates,clients,handelClients} = props;
    const lien = useRef(null);

    const [datas,setDatas] = useState([]);
    
    const handelSelect = (event) => {

        const {value} = event.target;
        const dates = value.split('-');

        handelClients( dates[0], dates[1] );
        
    }

    const handelCsv = (event) => {

        let csv = [["date","prénom", "nom", "email", "cotisation", "cotisation_tarif", "mur", "soutien", "licence", "licence_tarif","base+","base++","ski piste","skatline","trail","vtt","total"]];

        let toto = [];

        clients.adherents.map( (item,i) => {

        if( item.statut === 'validée' ){
           toto = [
                        item.date_create,
                        item.metas.metadata?.payer.lastName, 
                        item.metas.metadata?.payer.firstName,
                        item.metas.metadata?.payer.email,
                        item.metas.metadata?.cotisation,
                        item.metas.metadata?.tarif_cotisation/100,
                        item.metas.metadata?.mur/100,
                        item.metas.metadata?.soutien/100,
                        item.metas.metadata?.type_licence,
                        item.metas.metadata?.tarif_licence/100,
                        item.metas.metadata?.options_ffme[0].checked ? item.metas.metadata?.options_ffme[0].plein_tarif/100 : '',
                        item.metas.metadata?.options_ffme[1].checked ? item.metas.metadata?.options_ffme[1].plein_tarif/100 : '',
                        item.metas.metadata?.options_ffme[2].checked ? item.metas.metadata?.options_ffme[2].plein_tarif/100 : '',
                        item.metas.metadata?.options_ffme[3].checked ? item.metas.metadata?.options_ffme[3].plein_tarif/100 : '',
                        item.metas.metadata?.options_ffme[4].checked ? item.metas.metadata?.options_ffme[4].plein_tarif/100 : '',
                        item.metas.metadata?.options_ffme[5].checked ? item.metas.metadata?.options_ffme[5].plein_tarif/100 : '',
                        item.metas?.order ? item.metas.order?.amount.total/100 : '',
                    ]
            csv.push( toto );
            }
        })

        setDatas( csv );
        
        //lien.current.link.click();
    }

    useEffect( () => {

        if( datas.length > 0 ){
            lien.current.link.click();
        }

    },[datas]);

    const getTitre = () => {
        /**
         * Test si la date est vide ou pas pour récupérer la date
         * et l'attribuer au titre du CSV
         */
        let titre_csv = 'defaut.csv';
        let test_date = dates.filter( item => item.checked );

        if( test_date.length > 0 ) {
            titre_csv = `adherents_checkout_${test_date[0].mois}_${test_date[0].annees}.csv`;
        }else{
            titre_csv = `adherents_checkout_${dates[0].mois}_${dates[0].annees}.csv`; 
        }
        return titre_csv;
    }
    
    return(
        <div className="navig_dates">
            <select onChange={handelSelect}>
                {
                dates ? (
                    dates.map( (item,i) => (
                        <option key={i} selected={item.checked} value={item.value}>{item.option}</option>
                    ))
                ):('')
                }
            </select>
            <button onClick={handelCsv} className="export_csv">
                <img src={telechargement} />
                Export en CSV
            </button>
            <CSVLink separator=";" data={datas} ref={lien} filename={getTitre()} target="_blank" className="hidden"></CSVLink>
            
        </div>
    )

}
export default Navigdate;