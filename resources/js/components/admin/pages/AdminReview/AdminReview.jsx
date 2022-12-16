import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import getColumns from './columns';
import Add from './Add';
import Edit from './Edit';
import Swal from 'sweetalert2';

const AdminReview = () => {

    const [reviews, setReviews] = useState([]);
    const [editedReview, setEditedReview] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    const fetchCategories = async () => {
        await axios.get('/api/reviews')
            .then(({ data }) => {
                setReviews(data.reviews);

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

        Swal.fire({
            title: `Do you want to delete?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('/api/reviews/' + id)
                    .then(({ data }) => {
                        setReviews(reviews.filter(p => p.id !== id));
                        Swal.fire({ icon: 'success', title: 'Success' })
                    });
            }
        })
    }

    const editReview = async (id, values) => {

        const { data } = await axios.put('/api/reviews/' + id, values);

        const updatedReviews = _.cloneDeep(reviews);
        const review = updatedReviews.find(p => p.id === id);


        /*         product.name = data.data.name;
                product.description = data.data.description;
                product.price = data.data.price;
                product.category = data.data.category;
                product.image = data.data.image; */

        _.assign(review, data.data)
        setReviews(updatedReviews);

    }

    return (
        <div className='admin-review container'>
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
