const usePdfFamille = () => {

    const BACK_URL_PDF_FAMILLE = REACT_VARS.rootUrl + "back-pdf-helloasso/v1/get_pdf_famille";

    function handelPdf ( payer, famille_adulte,famille_enfant,famille_supp ) {
        
        const data = new FormData();
        data.append('nonce', REACT_VARS.nonce );
        data.append('payer', JSON.stringify(payer) );
        data.append('famille_adulte', JSON.stringify(famille_adulte) );
        data.append('famille_enfant', JSON.stringify(famille_enfant) );
        data.append('famille_supp', JSON.stringify(famille_supp) );

        fetch( 
            BACK_URL_PDF_FAMILLE ,
            { 
            method: 'POST',
            body: data,
            headers: {
                'X-WP-Nonce': REACT_VARS.rootNonce
            }
            })
            .then( res => 
                //res.json()
                res.blob()
            )
            .then( json => { 
                // console.log(payer.firstName,payer.lastName);
                let nom = `Famille_de_${payer.firstName}_${payer.lastName}.pdf`;
                downLoadPDF( json, nom );
            } )
            .catch( error => { console.log(error) } )
            

    }
    function downLoadPDF ( pdf, nom ) {

        const url = window.URL.createObjectURL( pdf );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nom );
        document.body.appendChild(link);
        link.click();

    }

    return [handelPdf];
}
export default usePdfFamille;