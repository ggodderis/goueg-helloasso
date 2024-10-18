/**
 * Hook pour stocker les informations au format hello asso
 */
import { useEffect, useState } from 'react';
import useCotisations from './useCotisations';

const useDatas = () => {

    const [liste,handelCotisation] = useCotisations();
    const [payer,setPayer] = useState({});
    const [datas,setDatas] = useState( {
        totalAmount: 0,
        initialAmount: 0,
        itemName: 'Adhésion au Club GDA',
        backUrl: 'https://www.club-montagne.retipolons.eu/page-d-exemple/', 
        errorUrl: 'https://www.club-montagne.retipolons.eu/hello_return', 
        returnUrl: 'https://www.club-montagne.retipolons.eu/hello_return', 
        containsDonation: true, 
        payer: {},
        metadata: {
            session_id: '',
            soutien: 0,
            mur: 0,
            cotisation: '',
            tarif_cotisation: 0,
            cotisation_famille: '',
            licence: '',
            type_licence: '',
            licence_famille: '',
            tarif_licence: 0,
            options_ffme: REACT_VARS.options_ffme,
            famille_adulte: {},
            famille_enfant: {},
            famille_supp: [],
            payer: {}
        }
    } );
    
/**
     * @param selection []
     * Contient la liste des activités pour les licences
     * contient également les selections faites par l'adhérent
     */
    const [selection,setSelection] = useState({
        famille: '',
        activites: [
        {descriptif:'Randonnée pédestre', name: 'RP', checked: false },
        {descriptif:'Raquette à neige', name: 'RN', checked: false },
        {descriptif:'Via ferrata', name: 'VF', checked: false },
        {descriptif:'Canyoning', name: 'CA', checked: false },
        {descriptif:'Ski alpin sur domaine station', name: 'SKIA', checked: false },
        {descriptif:'VTT', name: 'VTT', checked: false },
        {descriptif:'Escalade', name: 'ESCA', checked: false },
        {descriptif:'Alpinisme', name: 'ALPI', checked: false, label: 'Pratiquez vous l\'alpinisme à un niveau supérieur à PD ?', labelname: 'ALPI_SUP', labelchecked: false, show: false },
        {descriptif:'Ski de randonnée', name: 'SKIR', checked: false, label: 'Pratiquez vous le Ski de randonnée à un niveau supérieur à PD ?', labelname: 'SKIR_SUP',labelchecked: false, show: false },
        ],
        mur: {descriptif:'Voulez-vous utiliser le mur d\'escalade au gymnase Berthe de Boissieux ?',name:'mur', checked: false, plein_tarif:3000}
    }
    );

    useEffect( () => {
        //console.log("Mise à jour selection");

        let new_mur = 0;
        let activite_for_datas = null;

        if( selection.mur.checked ){
            new_mur = selection.mur.plein_tarif;
            selection.activites = selection.activites.map( (item,i) => { if( item.name === 'ESCA' ) { item.checked = true } return item; });
        }

        //let options_for_datas = selection.options.filter( item => item.checked );
        activite_for_datas = selection.activites.filter( item => item.checked );

        handelDatas('licence', getLicences(activite_for_datas,new_mur) );
        
        
    },[selection]);


const getLicences = (dt,new_mur) => {

        let licence_name = [];
        let ops = datas.metadata.options_ffme;

        dt.map( (item,i) => {
            if( item.checked ){
                licence_name.push(item.name);
            }
            if( item.labelchecked ){
                licence_name.push(item.labelname);
            }
        });

        let new_licence = null;

        //console.log('licence_name::',licence_name,selection.mur.checked );

    if( licence_name.length !==0 || selection.mur.checked ){

            if( licence_name.includes('ESCA') ||
                licence_name.includes('ALPI_SUP') ||
                licence_name.includes('SKIR_SUP') ||
                selection.mur.checked ){
                
                const {licences} = liste.ffme;

                if( selection.famille === 'famille'){ 
                    
                    Object.entries(licences).map( ([item,obj]) => {
                        
                            if( obj.titre == 'FFME_FF2' ){
                                new_licence = obj;
                            }  
                    });

                }else{
                    Object.entries(licences).map( ([item,obj]) => {
                        if( obj.titre == 'FFME_FJ' ){
                            new_licence = obj;
                        }else{
                            if( obj.titre == 'FFME_FA' ){
                            new_licence = obj;
                            }
                        }
                    });
                }

            }else{

                if( licence_name.includes('ALPI') ||
                    licence_name.includes('SKIR') ||
                    licence_name.includes('VTT') ||
                    licence_name.includes('VF') ||
                    licence_name.includes('CA') ||
                    licence_name.includes('SKIA') ){
                    
                    const {licences} = liste.ffr;
                    /**
                     * Remise à zéro des options
                     */
                    ops = ops.map( (item,i) => { item.checked = false; return item });

                    Object.entries(licences).map( ([item,obj]) => {

                        if( selection.famille === 'famille'){

                            if( obj.titre == 'FFR_FMPN' ){
                                new_licence = obj;
                            } 
                        }else{
                            if( obj.titre == 'FFR_IMPN' || obj.titre == 'FFR_IMPNJ'){
                                new_licence = obj;
                            }
                        }

                    });

                }else{

                    const {licences} = liste.ffr;
                    /**
                     * Remise à zéro des options
                     */
                    ops = ops.map( (item,i) => { item.checked = false; return item });

                    Object.entries(licences).map( ([item,obj]) => {

                        if( selection.famille === 'famille'){

                            if( obj.titre == 'FFR_FRA'){
                                new_licence = obj;
                            }
                            
                        }else{
                            if( obj.titre == 'FFR_IRA' || obj.titre == 'FFR_IMPNJ'){
                                new_licence = obj;
                            }
                        }

                    })
                }

            }


    }else{
        /**
         * Si la licence_name est vide on remet à zero la licence est les options
         */
        new_licence = [];
        ops = ops.map( (item,i) => { item.checked = false; return item });
    }

    return [new_licence,ops,new_mur];

}
/**
 * On surveille la mise à jour des information de l'adhérent
 * et on l'injecte dans datas.payer:{}
 * à chaque mise à jour de payer on appel handelCotisation
 * pour avoir les bonnes cotisations et licences selon la date de naissance
 */
    useEffect( () => {
 
        if( payer.dateOfBirth != undefined ){
            //console.log( 'useEffect payer',payer );
            
            handelCotisation( payer.dateOfBirth );

            setDatas({...datas,
                payer: payer,
                metadata: {
                    ...datas.metadata,
                    session_id: REACT_VARS.session_id,
                    payer: payer
                }
            });
        }

    }, [payer]);
/** */

    useEffect ( () => {
        
        doTotal();

        console.log('useEffect datas.metadata',datas);
        
        
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
            if( item.checked ){ options += Number(item.plein_tarif); }
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
        //console.log('datas change',datas);
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

                    let options = datas.metadata.options_ffme.map( (item,i) => { item.checked = false; return item });
                    let licences = selection.activites.map( (item,i) => { item.checked = false, item.labelchecked = false; return item } );
                    selection.activites = licences;
                    selection.mur =  {...selection.mur, checked: false }

                    setDatas({...datas,
                                metadata: {
                                ...datas.metadata,
                                mur: 0,
                                cotisation: event[1].titre,
                                cotisation_famille: event[1].type_licence,
                                tarif_cotisation: Number(event[1].tarif),
                                options_ffme: options,
                                type_licence: '',
                                licence_famille: '',
                                tarif_licence: 0,
                            } });
                }else{
                    /**
                     * Si c'est une adhésion ANP adhérent non pratiquant
                     * on reset toutes les infos..
                     */
                    let options = datas.metadata.options_ffme.map( (item,i) => { item.checked = false; return item });
                    let licences = selection.activites.map( (item,i) => { item.checked = false, item.labelchecked = false; return item } );
                    selection.activites = licences;
                    selection.mur =  {...selection.mur, checked: false }

                    setDatas({...datas,
                        metadata: {
                        ...datas.metadata,
                        mur: 0,
                        cotisation: event[1].titre,
                        tarif_cotisation: Number(event[1].tarif),
                        cotisation_famille: event[1].type_licence,
                        licence: '',
                        options_ffme: options,
                        type_licence: '',
                        licence_famille: '',
                        tarif_licence: 0,
                        famille_adulte: [],
                        famille_enfant: [],
                        famille_supp: []
                    } });
                }

            break;
            case 'licence':
                //console.log('licence',event[1][0],'options',event[1][1]);
                if( event[1][0] ){

                setDatas({...datas, metadata: {
                            ...datas.metadata,
                            licence: event[1][0].licence || '',
                            licence_famille: event[1][0].type_licence || '',
                            type_licence: event[1][0].titre || '',
                            tarif_licence: Number(event[1][0].tarif) || 0,
                            options_ffme: event[1][1] || [],
                            mur: event[1][2] || 0
                        } });

                }
                        
            break;
            case 'options':
                //console.log('useDatas options', event[1]);
                setDatas( {...datas, metadata:{
                    ...datas.metadata,
                    options_ffme: event[1]
                }});

            break;
            case 'add_membre':
                let new_famille = datas.metadata.famille_supp;
                let test = [...new_famille,event[1]];
                setDatas( {...datas, metadata:{ 
                    ...datas.metadata,
                    famille_supp: test
                }})
            break;
            case 'supp_membre':
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
            case 'adulte':
                setDatas( {...datas, metadata:{
                    ...datas.metadata,
                    famille_adulte: event[1]
                }})
            break;
            case 'enfant':
                setDatas( {...datas, metadata:{
                    ...datas.metadata,
                    famille_enfant: event[1]
                }})
            break;
            case 'membres':
                //console.log("Membres",event[1]);
                let membres = datas.metadata.famille_supp.map( (item,i) => { 
                    if( item.id === event[1].id ){
                        return event[1];
                    }else{
                        return item;
                    }
                })
                setDatas( {...datas, metadata:{
                    ...datas.metadata,
                    famille_supp: membres
                }})
            break;
        }
        
    }

    const user = datas.payer;
    const metadata = datas.metadata;

    return [datas,user,liste,metadata,selection,setSelection,handelDatas];

}
export default useDatas;