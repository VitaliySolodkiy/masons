import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './elements/ProductCard';
import ReactPaginate from 'react-paginate';

const CategoryPagination = () => {
    const { id } = useParams();

    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        getCategoryPageData();
    }, [id]);

    const getCategoryPageData = async () => {
        await axios.get(`/api/category/${id}`)
            .then(({ data }) => {
                console.log(data)
                setCategory(data.category);
                setProducts(data.products);
            })
    }

    //===========||=============

    const Items = ({ currentItems }) => {
        return (
            <>
                {currentItems &&
                    currentItems.map((product) => (
                        <div className="category-list-item">
                            <ProductCard product={product} />
                        </div>
                    ))}
            </>
        );
    }
    const itemsPerPage = 8;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    //==============

    const productsMaps = (product) => {
        return (
            <div className="category-list-item">
                <ProductCard product={product} />
            </div>
        )
    }

    return (

        <>
            <div className="category">
                <div className="category__container _container">
                    <h3>{category.name} with pagination</h3>
                    <h5>{category.description}</h5>
                    <div className="category__list">
                        <Items currentItems={currentItems} />
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryPagination;
