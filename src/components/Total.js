import { React, useState, useEffect } from 'react';

const Total = (props) => {

const {totalAmount} = props.datas;
const {cotisation,tarif_cotisation,options_ffme,type_licence,tarif_licence,mur,soutien} = props.datas.metadata;
// const [opt,setOpt] = useState(false);
// cotisation: '',
//             tarif_cotisation: '',
//             licence: '',
//             type_licence: '',
//             tarif_licence: '',


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
            options_ffme.map( (item,i) => (
                   <span key={i}>Options FFME {item.titre} <b>{item.plein_tarif/100} €</b></span>
                    
                ))
        }
        <span>Total <b>{totalAmount/100} €</b></span>
    </div>
)

}
export default Total;