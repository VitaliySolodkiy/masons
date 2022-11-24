import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Home = () => {

    const [latestProducts, setLatestPropucts] = useState([]);

    useEffect(() => {
        getHomePageData();
    }, []);

    const getHomePageData = async () => {
        await axios.get('/api/home-latest')
            .then(({ data }) => {
                setLatestPropucts(data.latestProducts);
            })
    }

    const productsMaps = (product) => {
        return (
            <Card style={{ width: '18rem' }} key={product.id}>
                <Link to={`/product/${product.id}`}>
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.price}$
                        </Card.Text>
                        <Button variant="warning">GO</Button>
                    </Card.Body>
                </Link>

            </Card >
        )
    }



    return (
        <>
            <div className="masons">

                <div className="masons__container _container">
                    <div className="masons-text">
                        <div className="masons-text__title">masons<br /><span>branding</span><br />wordshop</div>
                        <div className="masons-text__sub-title">High quality printing <span>Branding</span> of clothing and accessories</div>
                        <button className="masons-text__button">Catalog</button>
                    </div>
                </div>
            </div>
            <div className="our-services">
                <div className="our-services__container _container">
                    <h2 className="our-services__title">Our <span>services</span></h2>
                    <h5 className="our-services__sub-title">The main activity of Masons</h5>
                    <div className="service-items">
                        <div className="service-item">
                            <div className="service-item__background"></div>
                            <div className="service-item__title">Printing flex/flock film</div>
                            <div className="service-item__text">Quality printing<br />
                                For small runs</div>
                            <button className="service-item__button">Details</button>
                            <img src="../images/services/004-printing-machine.png" alt="" />
                        </div>
                        <div className="service-item">
                            <div className="service-item__background"></div>
                            <div className="service-item__title">Printing flex/flock film</div>
                            <div className="service-item__text">Quality printing<br />
                                For small runs</div>
                            <button className="service-item__button">Details</button>
                            <img src="../images/services/005-fever.png" alt="" />
                        </div>
                        <div className="service-item">
                            <div className="service-item__background"></div>
                            <div className="service-item__title">Printing flex/flock film</div>
                            <div className="service-item__text">Quality printing<br />
                                For small runs</div>
                            <button className="service-item__button">Details</button>
                            <img src="../images/services/001-printer.png" alt="" />
                        </div>
                        <div className="service-item">
                            <div className="service-item__background"></div>
                            <div className="service-item__title">Printing flex/flock film</div>
                            <div className="service-item__text">Quality printing<br />
                                For small runs</div>
                            <button className="service-item__button">Details</button>
                            <img src="../images/services/004-printing-machine.png" alt="" />
                        </div>
                        <div className="service-item">
                            <div className="service-item__background"></div>
                            <div className="service-item__title">Printing flex/flock film</div>
                            <div className="service-item__text">Quality printing<br />
                                For small runs</div>
                            <button className="service-item__button">Details</button>
                            <img src="../images/services/005-fever.png" alt="" />
                        </div>
                        <div className="service-item">
                            <div className="service-item__background"></div>
                            <div className="service-item__title">Printing flex/flock film</div>
                            <div className="service-item__text">Quality printing<br />
                                For small runs</div>
                            <button className="service-item__button">Details</button>
                            <img src="../images/services/001-printer.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="print-examples">
                <div className="print-examples__container _container">
                    <h3 className="print-examples__title"><span>Print</span> Examples</h3>
                    <h5 className="print-examples__sub-title">It might be on you</h5>
                    <Splide aria-label="My Favorite Images" options={{
                        perPage: 4,
                        perMove: 1,
                        pagination: false,
                        rewind: true,
                        classes: {
                            arrows: 'splide__arrows your-class-arrows',
                            slide: 'splide__slide my-slide'
                        }
                    }}>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/sweetshot.png" alt="Image 1" />
                        </SplideSlide>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/plain-white-tshirt.png" alt="Image 2" />
                        </SplideSlide>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/sweetshot.png" alt="Image 1" />
                        </SplideSlide>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/plain-white-tshirt.png" alt="Image 2" />
                        </SplideSlide>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/sweetshot.png" alt="Image 1" />
                        </SplideSlide>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/plain-white-tshirt.png" alt="Image 2" />
                        </SplideSlide>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/sweetshot.png" alt="Image 1" />
                        </SplideSlide>
                        <SplideSlide className='print-examples__item'>
                            <img src="../images/plain-white-tshirt.png" alt="Image 2" />
                        </SplideSlide>
                    </Splide>
                </div>
            </div>

            <div className="discounts">
                <div className="discounts-yellow-stripe"></div>
                <div className="discounts-t-shirt-background"></div>
                <div className="discounts__container _container">
                    <h3><span>Promotions</span> and offers</h3>
                    <h5>Hurry up</h5>

                    <Splide aria-label="My Favorite Images" options={{
                        perPage: 1,
                        perMove: 1,
                        pagination: false,
                        rewind: true,

                    }}>
                        <SplideSlide className='discounts-body'>
                            <div className="discounts-body__text">
                                <div className="discounts-body__title">Russian ship</div>
                                <div className="discounts-body__description">Buy a T-shirt and 10% of each purchase will go to the needs of the Armed Forces of Ukraine, buy a stylish T-shirt and support your rother at the front</div>
                                <button className="discounts-body__button"><a href="">Details</a></button>
                            </div>
                            <div className="discounts-body__image"><img src="../images/plain-white-tshirt800x800.png"
                                alt="" />
                            </div>
                        </SplideSlide>
                        <SplideSlide className='discounts-body'>
                            <div className="discounts-body__text">
                                <div className="discounts-body__title">Russian ship</div>
                                <div className="discounts-body__description">Buy a T-shirt and 10% of each purchase will go to the needs of the Armed Forces of Ukraine, buy a stylish T-shirt and support your rother at the front</div>
                                <button className="discounts-body__button"><a href="">Details</a></button>
                            </div>
                            <div className="discounts-body__image"><img src="../images/plain-white-tshirt800x800.png"
                                alt="" />
                            </div>
                        </SplideSlide>
                    </Splide>

                </div>

            </div>

            <div className="top-sales">
                <div className="top-sales__container _container">
                    <h2>Top Sa<span>les</span></h2>
                    <h5>What you like</h5>
                    <Tabs
                        defaultActiveKey="all"
                        id="uncontrolled-tab-example"
                        className="top-sales__list"
                    >
                        <Tab eventKey="all" title="All">
                            <div className="top-sales__cards">
                                <div className="top-sales-card product-card">
                                    {/* Заменить на ProductCard.jsx */}
                                    <div className="product-card__image"><img src="../images/plain-white-tshirt.png" alt="" /></div>
                                    <div className="product-card__title">White t-shirt</div>
                                    <div className="product-card__price">230₴</div>
                                </div>
                                <div className="top-sales-card product-card">
                                    <div className="product-card__image"><img src="../images/sweetshot.png" alt="" /></div>
                                    <div className="product-card__title">Sweet</div>
                                    <div className="product-card__price">430₴</div>
                                </div>
                                <div className="top-sales-card product-card">
                                    <div className="product-card__image"><img src="../images/mansons-man.png" alt="" /></div>
                                    <div className="product-card__title">Sweet Logo</div>
                                    <div className="product-card__price">530₴</div>
                                </div>
                                <div className="top-sales-card product-card">
                                    <div className="product-card__image"><img src="../images/sweetshot.png" alt="" /></div>
                                    <div className="product-card__title">Sweet</div>
                                    <div className="product-card__price">430₴</div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="cups" title="Cups">
                            <div className="top-sales__cards">
                                <div className="top-sales-card product-card">
                                    <div className="product-card__image"><img src="../images/plain-white-tshirt.png" alt="" /></div>
                                    <div className="product-card__title">White t-shirt</div>
                                    <div className="product-card__price">230₴</div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="t-shirts" title="T-shirts" >
                            <div className="top-sales__cards">
                                <div className="top-sales-card product-card">
                                    <div className="product-card__image"><img src="../images/mansons-man.png" alt="" /></div>
                                    <div className="product-card__title">Sweet Logo</div>
                                    <div className="product-card__price">530₴</div>
                                </div>
                                <div className="top-sales-card product-card">
                                    <div className="product-card__image"><img src="../images/sweetshot.png" alt="" /></div>
                                    <div className="product-card__title">Sweet</div>
                                    <div className="product-card__price">430₴</div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>

                </div>
            </div>

            <div className="catalog">
                <div className="catalog__container _container">
                    <h2>Cata<span>log</span></h2>
                    <h5>Choose whatever you like</h5>
                    <div className="catalog__body">
                        <div className="catalog-item">
                            <div className="catalog-item__image"><img src="../images/plain-white-tshirt.png" alt="" /></div>
                            <div className="catalog-item__title">T-shirt</div>
                            <div className="catalog-item__sub-title">Eco materials</div>
                        </div>
                        <div className="catalog-item">
                            <div className="catalog-item__image"><img src="../images/sweetshot.png" alt="" /></div>
                            <div className="catalog-item__title">Hoody</div>
                            <div className="catalog-item__sub-title">Eco materials</div>
                        </div>
                        <div className="catalog-item">
                            <div className="catalog-item__image"><img src="../images/plain-white-tshirt.png" alt="" /></div>
                            <div className="catalog-item__title">Cups</div>
                            <div className="catalog-item__sub-title">Best materials</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reviews">
                <div className="reviews__container _container">
                    <h2>Re<span>view</span>s</h2>
                    <h5>Just look what your neighbor says about us</h5>
                </div>
                <div className="reviews-carousel-wrapper">
                    <div className="reviews-yellow-stripe"></div>
                    <section id="reviews-carousel">
                        <Splide aria-label="My Favorite Images" options={{
                            perPage: 1,
                            perMove: 1,
                            pagination: false,
                            rewind: true,

                        }}>
                            <SplideSlide className='reviews-body'>
                                <div className="reviews-body__image">
                                    <img src="../images/reviews.png" alt="" />
                                </div>
                            </SplideSlide>
                            <SplideSlide className='reviews-body'>
                                <div className="reviews-body__image">
                                    <img src="../images/reviews.png" alt="" />
                                </div>
                            </SplideSlide>
                        </Splide>
                    </section>
                </div>


            </div>

            <div className="video">
                <div className="video__container _container">
                    <h3>Do you still have <span>doubts</span>?</h3>
                    <h5>Then watch this video and you will understand</h5>
                    <div className="video__body">
                        <iframe width="915" height="514" src="https://www.youtube.com/embed/BHACKCNDMW8"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            <div className="feedback">
                <div className="feedback__container _container">
                    <h2>Contact <span>us</span></h2>
                    <h5>It's simple and easy</h5>
                    <div className="feedback__body">
                        <div className="feedback-form">
                            <form action="" method="POST">
                                <input type="text" name="name" placeholder="Name" />
                                <input type="email" name="email" placeholder="Email" />
                                <input type="number" name="phone" placeholder="Phone" />
                                <textarea name="comment" placeholder="Comment"></textarea>
                                <button type="submit">Send</button>
                                <div className="feedback-form__social social">
                                    <a href=""><img src="../icons/telegram.png" alt="" /></a>
                                    <a href=""><img src="../icons/viber.png" alt="" /></a>
                                </div>

                            </form>
                        </div>
                        <div className="feedback-map">
                            <img src="../images/map.png" alt="" />
                        </div>
                    </div>
                    <div className="feedback__contact-cards">
                        <div className="feedback-card">
                            <div className="feedback-card__image"><img src="../icons/schedule.svg" alt="" /></div>
                            <div className="feedback-card__title">Schedule</div>
                            <div className="feedback-card__text">Mon.-Fri.<br />9:00 - 18:00</div>
                        </div>
                        <div className="feedback-card">
                            <div className="feedback-card__image"><img src="../icons/map.svg" alt="" /></div>
                            <div className="feedback-card__title">Map</div>
                            <div className="feedback-card__text">Kiyv<br />Independance, st.</div>
                        </div>
                        <div className="feedback-card">
                            <div className="feedback-card__image"><img src="../icons/contacts.png" alt="" /></div>
                            <div className="feedback-card__title">Contacts</div>
                            <div className="feedback-card__text">+38(099)-999-99-99<br />gmailexamp@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
