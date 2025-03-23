import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, createSearchParams } from 'react-router-dom';

import ProductCard from './elements/ProductCard';
import ReactPaginate from 'react-paginate';

const CategoryPagination = () => {
    const { id } = useParams();
    let [searchParams, setSearchParams] = useSearchParams({});

    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);

    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const sortParam = searchParams.get('sort') || 'newest';
    const itemsPerPageParam = searchParams.get('itemsPerPage');
    const currentPageStartParam = searchParams.get('currentStart');
    const currentPageEndParam = searchParams.get('currentEnd');
    const initialPage = +currentPageStartParam > 0 ? (+currentPageStartParam) / itemsPerPage : 0;
    useEffect(() => {
        let newCurrent = products.slice(itemOffset, endOffset);
        setCurrentItems(newCurrent);

        //создаем searchParams  и записываем их
        searchParams.set("currentStart", itemOffset);
        searchParams.set("currentEnd", endOffset);
        setSearchParams(searchParams);
        //====

    }, [products, itemOffset, itemsPerPage]);


    useEffect(() => {
        getCategoryPageData();

        if (currentPageStartParam) {
            setItemOffset(+currentPageStartParam);
        }
        if (itemsPerPageParam) {
            setItemsPerPage(+itemsPerPageParam);
        }

    }, [id]);


    const sortProducts = (value) => {

        switch (value) {
            case 'price-low-hight':
                setProducts((oldProducts) => [...oldProducts].sort((a, b) => a.price > b.price ? 1 : a.price < b.price ? -1 : 0));
                console.log("set search param: ", value);
                // setSearchParams({ ...searchParams, sort: value });
                searchParams.set("sort", value);
                break;

            case 'price-hight-low':
                setProducts((oldProducts) => [...oldProducts].sort((a, b) => a.price > b.price ? -1 : a.price < b.price ? 1 : 0));
                console.log("set search param: ", value);
                searchParams.set("sort", value);
                break;

            case 'oldest':
                setProducts((oldProducts) => [...oldProducts].sort((a, b) => Date.parse(a.created_at) > Date.parse(b.created_at) ? 1 : Date.parse(a.created_at) < Date.parse(b.created_at) ? -1 : 0));
                console.log("set search param: ", value);
                searchParams.set("sort", value);
                break;

            case 'newest':
                setProducts((oldProducts) => [...oldProducts].sort((a, b) => Date.parse(a.created_at) > Date.parse(b.created_at) ? -1 : Date.parse(a.created_at) < Date.parse(b.created_at) ? 1 : 0));
                console.log("set search param: ", value);
                searchParams.set("sort", value);
                break;

            default: console.log('default');
        }
    }

    const getCategoryPageData = async () => {
        await axios.get(`/api/category/${id}`)
            .then(({ data }) => {
                setCategory(data.category);
                setProducts(data.products);
            })
        sortProducts(sortParam);
    }


    const Items = ({ currentItems }) => {
        return (
            <>
                {currentItems &&
                    currentItems.map((product) => (
                        <div className="category-list-item" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
            </>
        );
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="category">
                <div className="category__container _container">
                    <div className="category__header">
                        <div className="category-header__title">
                            <h3>{category.name}</h3>
                            <h5>{category.description}</h5>
                        </div>
                        <div className="category-header__sorting">
                            <span>Sort:</span>
                            <div className='category-header__sorting-select'>
                                <select
                                    name="sort"
                                    id="sort"
                                    defaultValue={sortParam}
                                    onChange={(e) => sortProducts(e.target.value)}
                                >
                                    <option value="oldest">Oldest</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low-hight">Price: low to hight</option>
                                    <option value="price-hight-low">Price: hight to low</option>

                                </select>
                            </div>
                            <span>On page:</span>
                            <div className='category-header__sorting-select'>
                                <select

                                    name="itemsPerPage"
                                    id="itemsPerPage"
                                    defaultValue={itemsPerPageParam ? itemsPerPageParam : "8"}
                                    onChange={(e) => {
                                        setItemsPerPage(+e.target.value);
                                        searchParams.set('itemsPerPage', +e.target.value);
                                    }}
                                >
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="16">16</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="category__list">
                        <Items currentItems={currentItems} />

                    </div>
                    <div className="category__pagination">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=" >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            forcePage={initialPage}
                            previousLabel="< "
                            renderOnZeroPageCount={null}
                            containerClassName={'pagination'}
                            pageClassName={'pagination__page'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryPagination;
