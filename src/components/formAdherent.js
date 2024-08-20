import { React,useState,useEffect } from 'react';

const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

const FormAdherent = () => {

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
            <h2>Formulaire nouvel adhérent</h2>

            <div className="ligne_double">
                <label>
                    <span>Votre nom:</span>
                <input type="text" onChange={handelInputChange} name="" required />
                </label>
                <label>
                    <span>Votre prénom:</span>
                    <input type="text" name="" required />
                </label>
            </div>

            <div className="ligne_double">
                <label>
                    <span>Votre email:</span>
                <input type="email" onChange={handleEmailChange} name="" required />
                </label>
                <label>
                    <span>Votre téléphone:</span>
                    <input type="tel" name="" required />
                </label>
            </div>

            <div>
                <h3>Votre genre:</h3>
                <label>
                    <input type="radio" /> Femme
                </label>
                <label>
                    <input type="radio" /> Homme
                </label>

                <label>
                    <span>Votre date de naissance:</span>
                    <input type="date" name="" required />
                </label>
            </div>

            <label>
                <span>Votre adresse:</span>
                <input type="text" name="" required />
            </label>

            <div className="ligne_double">
                <label>
                    <span>Votre ville:</span>
                    <input type="text" name="" required />
                </label>
                <label>
                    <span>Votre code postal:</span>
                    <input type="text" name="" required />
                </label>
            </div>

            <h3>Personne à prévenir en cas de problème:</h3>

            <div className="ligne_double">
                <label>
                    <span>Nom de la personne:</span>
                    <input type="text" name="" required />
                </label>
                <label>
                    <span>Téléphone de la personne:</span>
                    <input type="tel" name="" required />
                </label>
            </div>

            <button type="submit" className="form_bt_valide">ÉTAPE SUIVANTE</button>

        </form>
    )
}
export default FormAdherent;