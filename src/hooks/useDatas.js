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

    const infos_for_total = [];

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
        
        doTotal();
        
    },[datas.metadata]);

/**
 * Calcul du total
 */
    const doTotal = () => {

        // console.log("soutien",datas.metadata.soutien,
        //             "mur",datas.metadata.mur,
        //             "tarif_cotisation", datas.metadata.tarif_cotisation,
        //             "tarif_licence",datas.metadata.tarif_licence
        // );

        let options = 0;

        metadata.options_ffme.map( (item,i) => {
            //console.log("Options",item.titre,item.plein_tarif);
            options += Number(item.plein_tarif);
        })

        
        let total = 0;

        total += Number( datas.metadata.soutien) ;
        total += Number( datas.metadata.mur );
        total += Number( datas.metadata.tarif_cotisation );
        total += Number( datas.metadata.tarif_licence ) || 0;
        total += Number( options );

        // Manque Mur d'escalade famille dans formulaire famille

        setDatas({...datas,
            totalAmount: total,
            initialAmount: total});
    }

    useEffect( () => {
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
                // console.log('cotisation', event[1].titre, event[1].tarif);

                if( event[1].titre != 'ANP') {
                    setDatas({...datas,
                                metadata: {
                                ...datas.metadata,
                                cotisation: event[1].titre,
                                tarif_cotisation: Number(event[1].tarif)
                            } });
                }else{
                    /**
                     * Si c'est une adhésion ANP adhérent non pratiquant
                     * on reset toutes les infos..
                     */
                    setDatas({...datas,
                        metadata: {
                        ...datas.metadata,
                        mur: 0,
                        cotisation: event[1].titre,
                        tarif_cotisation: Number(event[1].tarif),
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
                //console.log('licence', event[1].licence, event[1].titre, event[1] );
                setDatas({...datas, metadata: {
                            ...datas.metadata,
                            licence: event[1].licence || '',
                            licence_famille: event[1].type || '',
                            type_licence: event[1].titre || '',
                            tarif_licence: Number(event[1].tarif) || 0
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
            case 'mur':
                setDatas( {...datas, metadata:{
                    ...datas.metadata,
                    mur: Number(event[1])
                }})
            break;
            case 'soutien':
                setDatas( {...datas, metadata:{
                    ...datas.metadata,
                    soutien: Number(event[1])
                }})
            break;
        }
        
    }

    const user = datas.payer;
    const metadata = datas.metadata;

    return [datas,user,liste,metadata,handelDatas];

}
export default useDatas;