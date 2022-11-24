import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button as BtnAntd } from 'antd';
import { Form, Input } from 'antd';

const EditModal = ({ showModalEditState, modalEditClose, editedCategory, submitEditHandler }) => {
    return (
        <Modal show={showModalEditState} onHide={modalEditClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form name="category" initialValues={{ name: editedCategory.name, id: editedCategory.id }} onFinish={submitEditHandler} >
                    <Form.Item label="Category Name" name="name" rules={[{ required: true }, { min: 3 }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item hidden={true} name="id">
                        <Input />
                    </Form.Item>

                    <Form.Item >
                        <BtnAntd htmlType="submit" type="primary" className='me-3'>Save</BtnAntd>
                        <BtnAntd type="secondary" onClick={modalEditClose}>Cancel</BtnAntd>
                    </Form.Item>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditModal;
