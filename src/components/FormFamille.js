import { React,useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormMembre from './FormMembre';

// const isEmailValid = (email) => {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailPattern.test(email);
//   };

const FormFamille = (props) => {

  const {handelDatas} = props;
  const {famille_adulte,famille_enfant,famille_supp} = props.metadata;

  const [arrayMembre,setArrayMembre] = useState(famille_supp);

  const handelSuppMembre = (id) => {
    let new_array = arrayMembre.filter( item => item.id !== id );
    setArrayMembre(new_array);
   }

  const handelAddMembre = (event) => {
    let myref = uuidv4();
    setArrayMembre([...arrayMembre,{id:myref}]);
  }

  useEffect( () => {
    handelDatas('add_membre',arrayMembre);
  }, [arrayMembre]);

    // const handleEmailChange = (e) => {
    //     const value = e.target.value;
    //     //setEmail(value);
    
    //     if (!isEmailValid(value)) {
    //         console.log('Invalid email format.');
            
    //       //setError('Invalid email format.');
    //     } else {
    //         console.log('Email is ok...');
            
    //       //setError('');
    //     }
    //   };

    // const handelInputChange = (e) => {
    //     const {value,name} = e.target;
    // }

    useEffect( () => {
      console.log("useEffect",famille_supp);
    },[famille_supp]);

    return(
      <div>
         <div className="content_membre">
          <FormMembre legend="Deuxiéme Adulte" />
          <FormMembre legend="Enfant" />
          {
            famille_supp.map( (item,i) => (
              <FormMembre monid={item.id} key={i} handelSuppMembre={handelSuppMembre} isMobile="mobile" />
            )
            )
          }
        </div>
          <div className="content_ajouter">
            <button onClick={handelAddMembre} className="bt_bleu center">+ Ajouter un membre de famille</button>
            </div>
      </div>
    )
}
export default FormFamille;