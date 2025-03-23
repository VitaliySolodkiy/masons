import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// import Button from 'react-bootstrap/Button';
import { Button, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import EditModal from './Modal/EditModal';
import AddModal from './Modal/AddModal';

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState({});


    const fetchCategories = async () => {
        await axios.get('/api/home')
            .then(({ data }) => {
                setCategories(data.categories);
            })
            .catch(error => { throw new Error('Can`t load url') })
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    //====управление модальными окнами=====
    const [showModalAddState, setModalAddShow] = useState(false);
    const modalAddClose = () => setModalAddShow(false);
    const modalAddShow = () => setModalAddShow(true);

    const [showModalEditState, setModalEditShow] = useState(false);
    const modalEditClose = () => setModalEditShow(false);
    const modalEditShow = () => setModalEditShow(true);
    //===========//==========

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Do you want to delete this Category?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Don't delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`/api/categories/${id}`)
                    .then(({ data }) => {
                        setCategories(categories.filter(c => c.id !== id));
                        Swal.fire({ icon: 'success', title: data.message })
                    });
            }
        })
    }

    const submitAddHandler = (values) => {
        axios.post(`/api/categories`, values)
            .then(({ data }) => {
                setCategories([...categories, { id: data.id, name: data.name }])
            });
        setModalAddShow(false)
    }

    const submitEditHandler = (values) => {
        axios.put(`/api/categories/${values.id}`, values)
            .then(({ data }) => {
                setCategories(categories.map(category => category.id === data.id ? data : category))
            });
        setModalEditShow(false)
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "action",
            render: (category) => (
                <div>
                    <EditOutlined
                        style={{ fontSize: '25px', color: 'rgb(255 187 23)', paddingRight: '10px' }}
                        onClick={() => {
                            modalEditShow(); setEditedCategory(category)
                        }}
                    />

                    <DeleteOutlined
                        style={{ fontSize: '25px', color: 'rgb(255 106 0)' }}
                        onClick={() => deleteHandler(category.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className='container '>
            <h2 className='my-3'>Categories</h2>
            <Button type="primary" className='mb-3' onClick={modalAddShow}>Add Category</Button>
            {/*             <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => {
                        return <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                                <div className="row flex-nowrap gx-1">
                                    <div className="col d-flex justify-content-end">
                                        <a onClick={() => { modalEditShow(); setEditedCategory(category) }}><img src="../icons/edit.png" style={{ width: "25px" }} className="me-2" /></a>
                                    </div>
                                    <div className="col">
                                        <a onClick={() => deleteHandler(category.id)} ><img src="../icons/delete-32.png" style={{ width: "25px" }} /></a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table> */}
            <Table
                dataSource={categories}
                columns={columns}
                rowKey='id'
                pagination={{ pageSize: 5 }} />
            <AddModal
                showModalAddState={showModalAddState}
                modalAddClose={modalAddClose}
                submitAddHandler={submitAddHandler}
            />

            <EditModal
                showModalEditState={showModalEditState}
                modalEditClose={modalEditClose}
                editedCategory={editedCategory}
                submitEditHandler={submitEditHandler}
            />

        </div >
    );
}

export default AdminCategory;
