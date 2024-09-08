import { React,useState,useEffect } from 'react';

const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

const FormFamille = () => {

    const handleEmailChange = (e) => {
        const value = e.target.value;
        //setEmail(value);
    
        if (!isEmailValid(value)) {
            console.log('Invalid email format.');
            
          //setError('Invalid email format.');
        } else {
            console.log('Email is ok...');
            
          //setError('');
        }
      };

    const handelInputChange = (e) => {
        const {value,name} = e.target;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
      };

    return(
        <form onSubmit={handleSubmit} className="form_adherent_helloasso">
            <fieldset><legend>Formulaire Famille</legend></fieldset>
        </form>
    )
}
export default FormFamille;