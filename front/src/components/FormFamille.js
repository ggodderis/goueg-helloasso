import { React,useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormMembre from './FormMembre';

// const isEmailValid = (email) => {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailPattern.test(email);
//   };

const FormFamille = (props) => {

  const {handelDatas,setEtat,datas} = props;
  const {metadata} = datas;
  const {famille_adulte,famille_enfant,famille_supp} = datas.metadata;

  const handelSuppMembre = (id) => {
    let new_array = famille_supp.filter( item => item.id !== id );
    handelDatas('supp_membre',new_array);
   }

  const handelAddMembre = (event) => {
    let myref = uuidv4();
    let new_membre = {id:myref};
    handelDatas('add_membre',new_membre);
  }

  useEffect( () => {

    let etat = [];

    if( famille_adulte.dateOfBirth === undefined ){
      etat.push('Manque deuxième parent');
    }
    if( famille_enfant.dateOfBirth === undefined ){
      etat.push('Manque premier enfant');
    }
    famille_supp.map( (item,i) => {
      if(item.dateOfBirth === undefined ){
        etat.push(`Manque le membre ${i}`);
      }
    })

    if( etat.length === 0 ){
      setEtat(true);
    }else{
      setEtat(false);
    }
    
  },[metadata]);


    return(
      <div>
         <div className="content_membre">
          <FormMembre legend="adulte" titre="2eme Parent" key={uuidv4()} handelDatas={handelDatas} famille_adulte={famille_adulte} monid={uuidv4()} />
          <FormMembre legend="enfant" titre="Enfant 1" key={uuidv4()} handelDatas={handelDatas} famille_enfant={famille_enfant} monid={uuidv4()} />
          {
            famille_supp.map( (item,i) => (
              <FormMembre legend="membres" titre={`Enfant ${i+2}`} famille_supp={famille_supp} monid={item.id} key={uuidv4()} handelDatas={handelDatas} handelSuppMembre={handelSuppMembre} isReset="reset" />
            )
            )
          }
        </div>
          <div className="content_ajouter">
            <button onClick={handelAddMembre} className="bt_ajouter center">+ Ajouter un membre de famille</button>
            </div>
      </div>
    )
}
export default FormFamille;