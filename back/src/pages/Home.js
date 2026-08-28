const Home = () => {

    const ADMIN = REACT_VARS.isAdmin;
    
    return(
        <>
            <h2>Administration des paiements en ligne...</h2>
            {
                ADMIN ? (
                    <div>
                        <h4>Lien pour les fausses cartes de paiements</h4>
                        <a href="https://docs.stripe.com/testing?numbers-or-method-or-token=card-numbers#visa" target="parent">https://docs.stripe.com/testing?numbers-or-method-or-token=card-numbers#visa</a>
                    </div>
                ):('')
            }

        </>
    )
}
export default Home;