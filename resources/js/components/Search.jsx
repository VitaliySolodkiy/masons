import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const searchHandler = async ({ target }) => {
        setSearchText(target.value);
        if (target.value) {
            const { data } = await axios.get(`/api/search?q=${target.value}`);
            setProducts(data);
            return;
        }
        setProducts([]);
    }

    const searchPageHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/search?q=${searchText}`)

    }

    return (
        <div className='search-block'>
            <form
                onSubmit={searchPageHandler}
            >
                <input
                    type="search"
                    name="q"
                    value={searchText}
                    onInput={searchHandler}

                />
            </form>
            {
                products.length === 0 ? ' ' : (
                    <div className="search-result">
                        <ul>
                            {products.map(item => <li key={item.id}><a onClick={() => { setProducts([]); navigate(`/product/${item.id}`) }}>{item.name}</a></li>)}
                        </ul>
                    </div>
                )
            }

        </div >
    );
}

export default Search;
