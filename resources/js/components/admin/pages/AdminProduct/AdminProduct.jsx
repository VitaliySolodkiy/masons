import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import getColumns from './columns';
import Add from './Add';
import Edit from './Edit';

const AdminProduct = () => {

    const [products, setProducts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});

    const getProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts()
    }, []);

    const addProduct = (product) => {
        setProducts([...products, product])
    }

    const removeProduct = async (id) => {
        setProducts(products.filter(p => p.id !== id));
        const response = await axios.delete('/api/products/' + id);
    }

    const editProduct = async (id, values) => {

        const { data } = await axios.post('/api/products/' + id, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("data in AdminProduct: ", data);
        const updatedProducts = _.cloneDeep(products);
        const product = updatedProducts.find(p => p.id === id);
        console.log("product in AdminProduct: ", product);
        /*         product.name = data.data.name;
                product.description = data.data.description;
                product.price = data.data.price;
                product.category = data.data.category;
                product.image = data.data.image; */

        _.assign(product, data.data)
        setProducts(updatedProducts);
        console.log("updatedProducts in AdminProduct: ", updatedProducts);
    }


    return (
        <div className='container'>
            <h2 className='my-3'>Products</h2>
            <Add
                addProduct={addProduct}
            />
            <Edit
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                editedProduct={editedProduct}
                editProduct={editProduct}
            />
            <Table
                dataSource={products}
                columns={getColumns(removeProduct, setIsEditModalOpen, setEditedProduct)}
                rowKey='id'
                pagination={{ pageSize: 5 }} />

        </div>
    );
}

export default AdminProduct;
