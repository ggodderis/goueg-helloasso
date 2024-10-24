import { React, useState, useEffect, useContext } from 'react';
import { ContextDatas } from '../hooks/useContextDatas';

const LicenceFree = (props) => {

    const {liste} = useContext( ContextDatas );
    const {ffme,ffr} = liste;

    console.log( ffme.licences, ffr.licences );
    

    return(
        <div>
            <fieldset>
            <legend>Fédération Française de la Randonnée Pédestre</legend>
             {
                
                Object.entries(ffr.licences).map( ([item,obj]) => {
                    
                    if( obj.type_licence == 'seul'){
                        return(
                            <label className="label_radio">
                                <input type="checkbox" name={obj.name} id={obj.name} />
                                <span className="new_input"></span>
                                <div>{obj.descriptif}<br />{obj.titre}</div>
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
                            <label className="label_radio">
                                <input type="checkbox" name={obj.name} id={obj.name} />
                                <span className="new_input"></span>
                                <div>{obj.descriptif}<br />{obj.titre}</div>
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