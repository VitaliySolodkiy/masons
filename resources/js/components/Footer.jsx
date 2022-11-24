import React from 'react';

const Footer = () => {
    return (

        < footer className="footer" >
            <div className="footer__container _container">
                <div className="footer-contacts">
                    <div className="footer-contacts__logo"><img src="../images/logo.png" alt="" /></div>
                    <div className="footer-contacts__social social">
                        <a href=""><img src="../icons/telegram.png" alt="" /></a>
                        <a href=""><img src="../icons/viber.png" alt="" /></a>
                    </div>
                </div>
                <div className="footer-menu">
                    <ul>
                        <h6>Information</h6>
                        <li><a href="">Catalog</a></li>
                        <li><a href="">About us</a></li>
                        <li><a href="">Delivery and paymants</a></li>
                        <li><a href="">Returns</a></li>
                    </ul>
                    <ul>
                        <h6>Contacts</h6>
                        <li><a href="">Catalog</a></li>
                        <li><a href="">About us</a></li>
                        <li><a href="">Delivery and paymants</a></li>
                        <li><a href="">Returns</a></li>
                    </ul>
                </div>
                <div className="footer-subscribe">
                    <div className="footer-subscribe__title">Subscribe to news</div>
                    <div className="footer-subscribe__sub-title">Receive SMS from us with surprises</div>
                    <form action="">
                        <input type="email" name="email" placeholder="Email" />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </ footer>

    );
}

export default Footer;
