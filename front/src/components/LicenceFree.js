import { React, useState, useEffect, useContext } from 'react';
import { ContextDatas } from '../hooks/useContextDatas';

const LicenceFree = (props) => {

    const {liste,guide,metadata,selection,setSelection,handelDatas} = useContext( ContextDatas );
    const {options_ffme} = metadata;
    const {ffme,ffr} = liste;
    const {mur} = selection;

    //console.log( ffme.licences, ffr.licences );
    useEffect( () => {
        handelDatas( 'RESET_LICENCE' );
    },[]);

    useEffect( () => {

        console.log( 'useEffect',metadata.type_licence,options_ffme,guide,metadata.secteur );
        
    },[metadata]);

    const handelLicence = (event) => {
        const {name,value} = event.target;
        handelDatas('LICENCE_FREE', name, value );
    }
    /**
     * Choix Options
     */
    const handelOptions = (event) => {

        const {name,checked} = event.target;

        let new_options = options_ffme.map( (item,i) => {
        
                if (item.name === name){

                item.checked = checked;

                }
                return item;

                } 
            );
        
        handelDatas('OPTIONS',new_options);

    }
    /**
     *  Question sante
     */
    const handelSante = (event) => {
        handelDatas('SANTE', event.target.checked );
    }
    /**
     * Choix mur d'escalade
     */
    const handelClickMur = (event) => {

        const {checked,value} = event.target;

        if( checked ){
            handelDatas('MUR',value);
        }else{
            handelDatas('MUR',0);
        }
        
        
    }

    return(
        <div>
            <p className="champs_obligatoire"><span className="red">*</span>Sélection obligatoire</p>
            <fieldset>
            <legend>FFR - Fédération Française de la Randonnée Pédestre<span className="red">*</span></legend>
             {
                
                Object.entries(ffr.licences).map( ([item,obj]) => {
                    
                    if( obj.type_licence == 'seul'){
                        return(
                            <label key={`frr-${obj.id}`} className="label_radio">
                                <input type="checkbox" name={obj.titre} value={obj.secteur} checked={ obj.titre === metadata.type_licence } onChange={handelLicence} />
                                <span className="new_input"></span>
                                <div>Licence / Assurance : {obj.descriptif}<br />{obj.titre}</div>
                            </label>
                            )
                    }
                })

            }
            </fieldset>
            <fieldset>
            <legend>FFME - Fédération Française de la Montagne et de l'Escalade<span className="red">*</span></legend>
            {
                
                Object.entries(ffme.licences).map( ([item,obj]) => {
                            
                    if( obj.type_licence == 'seul'){
                        return(
                            <label key={`ffme-${obj.id}`} className="label_radio">
                                <input type="checkbox" name={obj.titre} value={obj.secteur} checked={ obj.titre === metadata.type_licence } onChange={handelLicence} />
                                <span className="new_input"></span>
                                <div>Licence / Assurance : {obj.descriptif}<br />{obj.titre}</div>
                            </label>
                            )
                    }

                })
            }
            </fieldset>
            {
                metadata.secteur === 'ffme' ? (
                <fieldset>
                <legend>FFME - Options supplémentaires (nom obligatoire)</legend>
               
                    {
                        options_ffme.map( (item,i) => (
                        <div className="ligne_licence">
                            <label key={item.id} className="label_radio">
                                <input type="checkbox" name={item.name} id={item.name} checked={item.checked} value={item.titre} onClick={handelOptions} />
                                <span className="new_input"></span>
                                {item.titre}&nbsp;<b>{item.plein_tarif/100}€</b>
                            </label>
                        </div>
                        ) )
                    }

                </fieldset>
            ):('')
            }

            <fieldset>
                <legend>{mur.descriptif}</legend>
                <label className="label_radio">
                    <input type="checkbox" name={mur.name} value={mur.plein_tarif} onChange={handelClickMur} />
                    <span className="new_input"></span>
                    oui :&nbsp;<b>{mur.plein_tarif/100}€</b>
                </label>
            </fieldset>

            <fieldset>
            {/* Si le secteur ffr ou ffme existe */}
            {
                metadata.secteur !='' ? (
                    <>
                    <legend>Avez-vous pris connaissance des conditions médicales de la <b>{metadata.secteur}</b> ?<span className="red">*</span></legend>
                    <label className="label_radio">
                        <input type="checkbox" name="questionnaire" onChange={handelSante} defaultChecked={ metadata.payer.question === true } />
                        <span className="new_input"></span>
                        oui&nbsp;&nbsp;<a href={`#sante_${metadata.secteur}`} >Consulter les conditions</a>
                    </label>
                    <br />
                    </>

                ):('')
            }
            </fieldset>
        </div>
    )

}
export default LicenceFree;