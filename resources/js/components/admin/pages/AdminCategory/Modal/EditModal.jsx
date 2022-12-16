import React, { useEffect } from 'react';
import { Form, Input, Modal, Button } from 'antd';

const EditModal = ({ showModalEditState, modalEditClose, editedCategory, submitEditHandler }) => {

    const [form] = Form.useForm();
    const initialValues = {};

    useEffect(() => {
        form.setFieldsValue({ name: editedCategory.name, id: editedCategory.id }); //если товар существует (редактирование) записываются его данные в форму. Если же мы только создаем товар, то форма пустая
    }, [editedCategory])

    return (

        <Modal title="Edit Category"
            open={showModalEditState}
            onCancel={modalEditClose}
            footer={null}

        >
            <Form
                name="category"
                form={form}
                initialValues={initialValues}
                onFinish={submitEditHandler}

            >
                <Form.Item label="Category Name" name="name" rules={[{ required: true }, { min: 3 }]}>
                    <Input />
                </Form.Item>

                <Form.Item hidden={true} name="id">
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button htmlType="submit" type="primary" className='me-3'>Save</Button>
                    <Button type="secondary" onClick={modalEditClose}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditModal;
