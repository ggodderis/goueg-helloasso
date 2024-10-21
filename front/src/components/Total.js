import { React, useState, useEffect, useContext } from 'react';
import { ContextDatas } from '../hooks/useContextDatas';

const Total = () => {

const {datas} = useContext( ContextDatas );

const {totalAmount} = datas;
const {cotisation,tarif_cotisation,options_ffme,type_licence,tarif_licence,mur,soutien} = datas.metadata;


return(
    <div class="hello_total">
        {
            cotisation !== '' ? ( <span>Adhésion au club {cotisation} <b>{tarif_cotisation/100} €</b></span>):('')
        }
        {
            mur > 0 ? (<span>Mur d'escalade <b>{mur/100} €</b></span>):('')
        }
        {
            soutien > 0 ? (<span>Cotisation de soutien <b>{soutien/100} €</b></span>):('')
        }
        {
            type_licence ? ( <span>Licence et assurance {type_licence} <b>{tarif_licence/100} €</b></span>):('')
        }
        {
            options_ffme.map( (item,i) => 
                item.checked ? (<span key={i}>Options FFME {item.titre} <b>{item.plein_tarif/100} €</b></span>):('')
                )
        }
        <span>Total <b>{totalAmount/100} €</b></span>
    </div>
)

}
export default Total;