import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import getColumns from './columns';
import Add from './Add';
import Edit from './Edit';

const AdminReview = () => {

    const [reviews, setReviews] = useState([]);
    const [editedReview, setEditedReview] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    const fetchCategories = async () => {
        await axios.get('/api/reviews')
            .then(({ data }) => {
                setReviews(data.reviews);
                console.log(data.reviews);
            })
            .catch(error => { throw new Error('Can`t load url') })
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const addReview = (review) => {
        setReviews([...reviews, review])
    }

    const removeReview = async (id) => {
        setReviews(reviews.filter(p => p.id !== id));
        const response = await axios.delete('/api/reviews/' + id);
    }

    const editReview = async (id, values) => {

        const { data } = await axios.put('/api/reviews/' + id, values);
        console.log("data in AdminReview: ", data);
        const updatedReviews = _.cloneDeep(reviews);
        const review = updatedReviews.find(p => p.id === id);
        console.log("product in Adminreview: ", review);

        /*         product.name = data.data.name;
                product.description = data.data.description;
                product.price = data.data.price;
                product.category = data.data.category;
                product.image = data.data.image; */

        _.assign(review, data.data)
        setReviews(updatedReviews);
        console.log("updatedReviews in AdminReview: ", updatedReviews);
    }

    return (
        <div className='container'>
            <h2 className='my-3'>Reviews</h2>
            <Add
                addReview={addReview}
            />
            <Edit
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                editedReview={editedReview}
                editReview={editReview}
            />
            <Table
                dataSource={reviews}
                columns={getColumns(removeReview, setIsEditModalOpen, setEditedReview)}
                rowKey='id'
                pagination={{ pageSize: 5 }} />

        </div>
    );
}

export default AdminReview;
