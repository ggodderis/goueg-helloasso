/**
 * Hook pour stocker les informations au format hello asso
 */
import { React, useEffect, useState } from 'react';

const useDatas = () => {

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
            tarif_licence: '',
            famille: {}
        }
    } );

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
                setDatas({...datas, payer: event[1] });
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
        }
        
    }

    const user = datas.payer;
    const metadata = datas.metadata;

    return [datas,user,metadata,handelDatas];

}
export default useDatas;