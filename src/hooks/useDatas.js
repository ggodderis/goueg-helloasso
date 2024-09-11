/**
 * Hook pour stocker les informations au format hello asso
 */
import { React, useEffect, useState } from 'react';
import useCotisations from './useCotisations';

const useDatas = () => {

    const [liste,handelCotisation] = useCotisations();
    const [payer,setPayer] = useState({});
    const [datas,setDatas] = useState( {
        totalAmount: 0,
        initialAmount: 0,
        itemName: 'Adhésion au Club GDA',
        backUrl: 'https://www.club-montagne.net/helloasso/back.php', 
        errorUrl: 'https://www.club-montagne.net/helloasso/error.php', 
        returnUrl: 'https://www.club-montagne.net/helloasso/return.php', 
        containsDonation: true, 
        payer: {},
        metadata: {
            soutien: 0,
            mur: 0,
            cotisation: '',
            tarif_cotisation: 0,
            cotisation_famille: '',
            licence: '',
            type_licence: '',
            licence_famille: '',
            tarif_licence: 0,
            options_ffme: [],
            famille_adulte: [],
            famille_enfant: [],
            famille_supp: [],
            payer: {}
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
            console.log( 'Payer :: ',payer );
            
            handelCotisation( payer.dateOfBirth );

            setDatas({...datas,
                payer: payer,
                metadata: {
                    ...datas.metadata,
                    options_ffme: [],
                    payer: payer
                }
            });
        }

    }, [payer]);
/** */

    useEffect ( () => {
        console.log(datas);
        
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
                //console.log('cotisation', event[1].titre, event[1].tarif);
                if( event[1].titre != 'ANP') {
                    setDatas({...datas,
                                metadata: {
                                ...datas.metadata,
                                cotisation: event[1].titre,
                                tarif_cotisation: event[1].tarif
                            } });
                }else{
                    /**
                     * Si c'est une adhésion ANP adhérent non pratiquant
                     * on reset toutes les infos..
                     */
                    setDatas({...datas,
                        totalAmount: event[1].tarif,
                        initialAmount: event[1].tarif,
                        metadata: {
                        ...datas.metadata,
                        cotisation: event[1].titre,
                        tarif_cotisation: event[1].tarif,
                        cotisation_famille: '',
                        licence: '',
                        type_licence: '',
                        licence_famille: '',
                        tarif_licence: 0,
                        options_ffme: [],
                        famille_adulte: [],
                        famille_enfant: [],
                        famille_supp: []
                    } });
                }

            break;
            case 'licence':
                //console.log('licence', event[1].titre, event[1] );
                setDatas({...datas, metadata: {
                            ...datas.metadata,
                            licence_famille: event[1].type,
                            type_licence: event[1].titre,
                            tarif_licence: event[1].tarif
                        } });
            break;
            case 'options':
                setDatas( {...datas, metadata:{
                    ...datas.metadata,
                    options_ffme: event[1]
                }})
            break;
            case 'add_membre':
                setDatas( {...datas, metadata:{ 
                    ...datas.metadata,
                    famille_supp: event[1]
                }})
            break;
        }
        
    }

    const user = datas.payer;
    const metadata = datas.metadata;

    return [datas,user,liste,metadata,handelDatas];

}
export default useDatas;