import { React, useState, useEffect, useContext } from 'react';
import { ContextDatas } from '../hooks/useContextDatas';

const LicenceFree = (props) => {

    const {liste,handelDatas} = useContext( ContextDatas );
    const {ffme,ffr} = liste;

    console.log( ffme.licences, ffr.licences );

    const handelLicence = (event) => {
        const {name,value} = event.target;
        //console.log(event.target);
        
        handelDatas('LICENCE_FREE', name, value );
    }

    return(
        <div>
            <fieldset>
            <legend>Fédération Française de la Randonnée Pédestre</legend>
             {
                
                Object.entries(ffr.licences).map( ([item,obj]) => {
                    
                    if( obj.type_licence == 'seul'){
                        return(
                            <label key={`frr-${obj.id}`} className="label_radio">
                                <input type="checkbox" name={obj.titre} value={obj.secteur} onClick={handelLicence} />
                                <span className="new_input"></span>
                                <div>Licence / Assurance : {obj.descriptif}<br />{obj.titre}</div>
                            </label>
                            )
                    }
                })

            }
            </fieldset>
            <fieldset>
            <legend>Fédération Française de la Montagne et de l'Escalade</legend>
            {
                
                Object.entries(ffme.licences).map( ([item,obj]) => {
                            
                    if( obj.type_licence == 'seul'){
                        return(
                            <label key={`ffme-${obj.id}`} className="label_radio">
                                <input type="checkbox" name={obj.titre} value={obj.secteur} onClick={handelLicence} />
                                <span className="new_input"></span>
                                <div>Licence / Assurance : {obj.descriptif}<br />{obj.titre}</div>
                            </label>
                            )
                    }

                })
            }
            </fieldset>
        </div>
    )

}
export default LicenceFree;