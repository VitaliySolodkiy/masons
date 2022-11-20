import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getHomePageData();
    }, []);

    const getHomePageData = async () => {
        await axios.get('/api/home')
            .then(({ data }) => {
                setCategories(data.categories);

            })
    }

    return (
        <div className='sidebar'>
            <h2 className='my-3'>Categories</h2>
            <div className="list-group">
                {categories.map((category) => (
                    <Link to={`/category/${category.id}`} className="list-group-item list-group-item-action" key={category.id}>{category.name}</Link>
                ))
                }

            </div >
        </div >
    );
}

export default Sidebar;
