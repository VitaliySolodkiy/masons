import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { Button as BtnAntd } from 'antd';
import { Form, Input } from 'antd';

const AddModal = ({ showModalAddState, modalAddClose, submitAddHandler }) => {
    return (
        <Modal show={showModalAddState} onHide={modalAddClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form name="category" onFinish={submitAddHandler} >
                    <Form.Item label="Category Name" name="name" rules={[{ required: true }, { min: 3 }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item >
                        <BtnAntd htmlType="submit" type="primary" className='me-3'>Save</BtnAntd>
                        <BtnAntd type="secondary" onClick={modalAddClose}>Cancel</BtnAntd>
                    </Form.Item>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddModal;
