import { React, useEffect, useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import Select from './components/Select';
import FileAdd from './components/Fileadd';
import Ecran from './components/Ecran';
import Tromb from '../assets/attachment.png';


const App = () => {

    //const AJAX_URL = the_ajax_script.ajaxurl;
    const ROOT_URL = the_ajax_script.rootUrl + "goueg-phpmailer/v1/set_datas";
    const FORMATS_MIME = ['text/javascript','text/php','text/html'];

    // console.log(ROOT_URL);
    

    const [role, setRole] = useState('');
    const [object, setObject] = useState('')
    const [message, setMessage] = useState('');
    const [mode, setMode] = useState(false);
    const [file, setFile] = useState([]);
    const [canclick, setCanclick] = useState(false);
    const [send, setSend ] = useState(false);
    const [year,setYear ] = useState(false);
    // const [size, setSize] = useState(0);

useEffect( () => {

    if( role === '' || object === '' || message === '' ){
        // console.log( 'pas d\'envoi possible' );
        setCanclick(false);
    }else{
        // console.log( 'Tout est ok..' );
        setCanclick(true);
    }   

},[role,object,message,mode]);

/**
 * Supprime une fichier dans [file, setFile]
 * @param {*} name 
 */
function suppFile (name){
    console.log( 'suppFile', name );
    setFile(
        file.filter(a => a.name !== name )
        );
}

/**
 *  Ajouter le ou les fichier(s) a [file, setFile]
 * @param {*} event 
 */
function handleAddFile(event){

    var taille = 0;

    //const files = event.target.files;
    const uploads = [...event.target.files].map( element => {


        if( FORMATS_MIME.includes(element.type) ){
            console.log( element.type , 'Format interdit...');
        }
        if( (taille+=element.size) > 4000000 ){
            console.log( 'on est aux limites de poids !');
        }
        else{
            setFile( file => [...file,element] );
        }
        console.log( element.type , taille );
        // setFile( file => [...file,element] );

    });
}

/**
 * Gestion du champs de texte Objet pour l'email
 * Ajouter la valeur à [object,setObject]
 * @param {*} event 
 */
function handelObject(event){
    setObject( event.target.value );
}

/**
 * Mode test ou pas
 */
function handelMode( event ){
    setMode( event.target.checked );
}

/**
 * Gestion du champs message pour l'email
 * Ajouter la valeur à [message, setMessage ]
 * @param {*} event 
 */
function handelMessage( event ) {
    setMessage(event.target.value);
}

/**
 *  Reset de toutes les valeurs
 */
function handelResetAll(){
    setRole('');
    setObject('');
    setMessage('');
    setMode(false);
    setFile([]);
    setCanclick(false);
    setSend(false);
    setYear(false);
}
/**
 *  Envoyer les données à php
 * @param {*} event 
 */
    function handelSend( event ){
        /**
         *  pour afficher l'écran de loading
         */
        setSend( true );

        const data = new FormData();


        /**
         *  Parcours de l'objet Fileliste pour ajouter tous les fichiers
         * au formaData
         */
        file.map((f,index) => {
            data.append("file_"+index, f );
        })
            //data.append('action', 'goueg_get_react' );
            data.append('objet', object );
            data.append('message', message );
            data.append('role', role );
            data.append('mode', mode );
            data.append('year', year );
            data.append('nonce', the_ajax_script.nonce );

        fetch( 
            ROOT_URL ,
            { 
            method: 'POST',
            body: data,
            headers: {
                'X-WP-Nonce': the_ajax_script.rootNonce
            }
        })
        .then( res => res.json()  )
        .then( json => { 
            console.log(json);
            handelResetAll();
        } )
        .catch( error => { 
            console.log(error);
            handelResetAll();
        } )

    }

/**
 * Checkbox année précédente
 */
    const handelLastYear = (event) => {
        const {target} = event;
        setYear( target.checked );
    }

    return (
        <>
        {
            send &&  <Ecran /> 
        }
        <div>
            <h2 className="app-title">Envoi d'emails</h2>
            <hr />
            <div className="content-role-annee">
                <Select setRole={setRole} role={role} />
                <label>Inclure l'année précédente
                <input type="checkbox" onChange={handelLastYear} name="old_year" checked={year} />
                </label>
            </div>
            <div className="content_objet">
                <label>Objet:<br/>
                <input type="text" onChange={handelObject} value={object} name="objet" placeholder="Saisir l'objet de votre mail" />
                </label>
            </div>
            <div className="content_bouton">
                <label for="file">
                    <img src={Tromb} />
                    Joindre un/des fichier(s)
                    <input id="file" type="file" multiple="multiple" onChange={handleAddFile} />
                </label>
            </div>
            <div className="items">
                {
                file.map( (files,index) => <FileAdd key={index} file={files} supp={suppFile} /> )
                }
            </div>
                <Editor value={message} onChange={handelMessage} placeholder="Saisir votre message ici..." />
                <div class="content_bouton">
                    <button onClick={ ()=>{ canclick && handelSend() } } className="bt_send">Envoyer</button>
                </div>
        </div>

        <hr />
            <div className="content_objet">
                <label>Mode test pour Grég uniquement:
                &nbsp;<input type="checkbox" checked={mode} onChange={handelMode} name="mode" />
                </label>
            </div>
        </>
     );
}

export default App;