import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [searchResultElemShow, setSearchResultElemShow] = useState('hide');

    useEffect(() => {
        document.body.addEventListener('click', () => {
            setSearchResultElemShow('hide');
        })
    }, []);

    const searchHandler = async ({ target }) => {
        setSearchText(target.value);
        setSearchResultElemShow('show');
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
        setSearchResultElemShow('hide');
        navigate(`/search?q=${searchText}`);
        setSearchText('');
    }

    return (
        <>

            <div className="header-logo__search">
                <form onSubmit={searchPageHandler}>
                    <span className="search-icon"><img src="../icons/search.png" alt="" /></span>
                    <input type="search" name="q" value={searchText} placeholder={'Search'} onInput={searchHandler} />
                </form>
                <div className={`header-logo__search-result ${searchResultElemShow}`}>
                    {products.length === 0
                        ? <p>No results found</p>
                        : (
                            <ul>
                                {products.map(item => <li key={item.id}><a onClick={() => { setProducts([]); navigate(`/product/${item.id}`); setSearchText(''); }}>{item.name}</a></li>)}
                            </ul>
                        )
                    }

                </div>

            </div>
        </>
    );
}

export default Search;
