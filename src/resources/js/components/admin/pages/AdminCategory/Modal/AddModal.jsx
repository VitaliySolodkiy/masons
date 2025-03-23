import React from 'react';


import { Form, Input, Modal, Button } from 'antd';

const AddModal = ({ showModalAddState, modalAddClose, submitAddHandler }) => {
    return (
        <Modal title="Add Category"
            open={showModalAddState}
            onCancel={modalAddClose}
            footer={null}
        >
            <Form name="category" onFinish={submitAddHandler} >
                <Form.Item label="Category Name" name="name" rules={[{ required: true }, { min: 3 }]}>
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button htmlType="submit" type="primary" className='me-3'>Save</Button>
                    <Button type="secondary" onClick={modalAddClose}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddModal;
