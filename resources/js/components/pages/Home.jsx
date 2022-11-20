import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

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
        <div className='container '>
            <h2 className='my-3'>Home page</h2>
            <h5 className='my-3'>Latest Products:</h5>
            <div className="product_list">
                {latestProducts.map(productsMaps)}
            </div>
        </div >
    );
}

export default Home;
