import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


const FormProduct = ({ handleCancel, addProduct, editedProduct, editProduct }) => {
    const [categories, setCategories] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [fileListGallery, setFileListGallery] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (editedProduct) {
            form.setFieldsValue(editedProduct); //если товар существует (редактирование) записываются его данные в форму. Если же мы только создаем товар, то форма пустая
            setFileList([{ url: editedProduct.image }])
        }


    }, [editedProduct, form])

    const getCategories = async () => {
        const { data } = await axios.get('/api/categories');
        const items = data.map(item => { return { value: item.id, label: item.name } })
        setCategories(items);

    }

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const initialValues = {}

    const submitHandler = async (values) => {
        const { data } = await axios.post('/api/products', values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (data.success === true) {

            addProduct(data.data);
            handleCancel();
        }
    };

    return (
        <Form
            initialValues={initialValues}
            onFinish={(values) => {
                editProduct ? editProduct(editedProduct.id, values) : submitHandler(values);
                handleCancel();
            }}
            form={form}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Desc"
                name="description"
                rules={[{ required: true }]}
            >
                <TextArea />
            </Form.Item>

            <Form.Item
                label="Category"
                name="category_id"
                rules={[{ required: true }]}
            >
                <Select

                    style={{
                        width: 120,
                    }}

                    options={categories}
                />
            </Form.Item>

            <Form.Item
                label="Image"
                name="image"
            >
                <Upload
                    beforeUpload={() => false}
                    onChange={({ fileList }) => setFileList(fileList)}
                    listType="picture-card"
                    maxCount={1}
                    fileList={fileList}
                    onPreview={onPreview}>
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Gallery"
                name="gallery"
            >
                <Upload
                    beforeUpload={() => false}
                    onChange={({ fileList }) => setFileListGallery(fileList)}
                    listType="picture-card"
                    maxCount={10}
                    fileList={fileListGallery}
                    onPreview={onPreview}>
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary">Save</Button>
            </Form.Item>

        </Form>
    );
}

export default FormProduct;
