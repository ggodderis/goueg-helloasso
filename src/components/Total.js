import { React, useState, useEffect } from 'react';

const Total = (props) => {

    
const {cotisation,tarif_cotisation,options_ffme,type_licence,tarif_licence} = props.datas.metadata;
// const [opt,setOpt] = useState(false);
const [total,setTotal] = useState('');
// cotisation: '',
//             tarif_cotisation: '',
//             licence: '',
//             type_licence: '',
//             tarif_licence: '',

useEffect( () => {

    // if( type_licence === 'FFME_FA' || type_licence ==='FFME_FJ' || type_licence ==='FFME_FF2'){
    //     setOpt(true);
    // }else{
    //     setOpt(false);
    // }

    handelTotal();

},[props]);

const handelTotal = () => {

    let somme = 0;

    somme+=Number(tarif_cotisation);

    if( tarif_licence != undefined ){
        somme+=Number(tarif_licence);
    }
    
    options_ffme.map( (item,i) => {
            somme+=Number(item.plein_tarif);
        })
    

    setTotal(somme);
}


return(
    <div class="hello_total">
        {
            cotisation !== '' ? ( <span>Adhésion au club {cotisation} <b>{tarif_cotisation/100} €</b></span>):('')
        }
        {
            type_licence ? ( <span>Licence et assurance {type_licence} <b>{tarif_licence/100} €</b></span>):('')
        }
        {
            options_ffme.map( (item,i) => (
                   <span key={i}>Options FFME {item.titre} <b>{item.plein_tarif/100} €</b></span>
                    
                ))
        }
        <span>Total <b>{total/100} €</b></span>
    </div>
)

}
export default Total;