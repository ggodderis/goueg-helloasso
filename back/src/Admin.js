import { React, useEffect, useState } from 'react';

import useTarifs from './hooks/useTarifs';

const Admin = () => {

    const [handelTarifs] = useTarifs();

   const handelClick = (event) => {
        handelTarifs();
    }

    return(
        <>
        <h1>Prochainement l'administration</h1>
        <button onClick={handelClick}>get infos</button>
        </>
    );
}
export default Admin;