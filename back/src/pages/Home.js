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

                    <h4>Page de retour:</h4>
                    <p>http://dev.club-montagne.net/hello_return/?checkoutIntentId=7227526&code=succeeded&orderId=96901</p>
                    <p>https://www.club-montagne.net/hello_return/?checkoutIntentId=7227526&code=succeeded&orderId=96901</p>
                    </div>
                ):('')
            }

        </>
    )
}
export default Home;