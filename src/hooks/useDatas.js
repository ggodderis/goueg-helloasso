/**
 * Hook pour stocker les informations au format hello asso
 */
import { React, useEffect, useState } from 'react';
import useCotisations from './useCotisations';

const useDatas = () => {

    const [liste,handelCotisation] = useCotisations();
    const [payer,setPayer] = useState({});
    const [datas,setDatas] = useState( {
        totalAmount: '',
        initialAmount: '',
        itemName: '',
        backUrl: 'https://www.club-montagne.net/helloasso/back.php', 
        errorUrl: 'https://www.club-montagne.net/helloasso/error.php', 
        returnUrl: 'https://www.club-montagne.net/helloasso/return.php', 
        containsDonation: true, 
        payer: {},
        metadata: {
            id: '007',
            cotisation: '',
            tarif_cotisation: '',
            licence: '',
            type_licence: '',
            tarif_licence: '',
            option_ffme: {},
            famille: {}
        }
    } );

/**
 * On surveille la mise à jour des information de l'adhérent
 * et on l'injecte dans datas.payer:{}
 * à chaque mise à jour de payer on appel handelCotisation
 * pour avoir les bonnes cotisations et licences selon la date de naissance
 */
    useEffect( () => {
 
        if( payer.dateOfBirth != undefined ){
            console.log( payer );
            
            handelCotisation( payer.dateOfBirth );
            setDatas({...datas, payer: payer });
        }

    }, [payer]);
/** */

    useEffect ( () => {
        console.log(datas.metadata);
        
    },[datas]);

/**
 * 
 * @param  {...any} event 
 * @event[0] = string
 * @event[1] = object
 */
    const handelDatas = (...event) => {
        //console.log( event[0] , event[1].firstName );
        switch( event[0] ){
            case 'adherent':
                //setDatas({...datas, payer: event[1] });
                setPayer( event[1] );
                break;
            case 'cotisation':
                console.log('cotisation', event[1].titre, event[1].tarif);
                setDatas({...datas, metadata: {
                            ...datas.metadata,
                            cotisation: event[1].titre,
                            tarif_cotisation: event[1].tarif
                        } });
                    //setDatas({...datas, payer: event[1] });
            break;
            case 'licence':
                console.log('licence', event[1].titre, event[1] );
                setDatas({...datas, metadata: {
                            ...datas.metadata,
                            type_licence: event[1].titre,
                            tarif_licence: event[1].tarif
                        } });
                    //setDatas({...datas, payer: event[1] });
            break;
        }
        
    }

    const user = datas.payer;
    const metadata = datas.metadata;

    return [datas,user,liste,metadata,handelDatas];

}
export default useDatas;