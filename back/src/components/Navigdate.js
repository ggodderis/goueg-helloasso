import { React, useEffect, useState, useRef } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

const Navigdate = (props) => {

    const {dates,clients,handelClients} = props;
    const lien = useRef(null);

    const [datas,setDatas] = useState([]);

    //console.log(clients.adherents);
    
    const handelSelect = (event) => {

        const {value} = event.target;
        const dates = value.split('-');

        handelClients( dates[0], dates[1] );
        
    }

    const handelCsv = (event) => {

        let csv = [["firstname", "lastname", "email", "cotisation", "cotisation_tarif", "mur", "soutien", "licence", "licence_tarif"]];

        let toto = [];

        clients.adherents.map( (item,i) => {

           toto = [item.metas.metadata.payer.lastName, 
                        item.metas.metadata.payer.firstName,
                        item.metas.metadata.payer.email,
                        item.metas.metadata.cotisation,
                        item.metas.metadata.tarif_cotisation/100,
                        item.metas.metadata.mur/100,
                        item.metas.metadata.soutien/100,
                        item.metas.metadata.type_licence,
                        item.metas.metadata.tarif_licence/100];
            csv.push( toto );
        })

        setDatas( csv );
        
        //lien.current.link.click();
    }

    useEffect( () => {

        if( datas.length > 0 ){
            lien.current.link.click();
        }

    },[datas]);
    
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
            <button onClick={handelCsv} className="export_csv">Export en CSV</button>
            <CSVLink data={datas} ref={lien} filename={"export_clients.csv"} target="_blank" className="hidde"></CSVLink>
            
        </div>
    )

}
export default Navigdate;