import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Upload, Button, Checkbox, Col, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { json } from 'react-router-dom';


const FormProduct = ({ handleCancel, addProduct, editedProduct, editProduct }) => {
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [fileListGallery, setFileListGallery] = useState([]);
    const [form] = Form.useForm();
    const [checkedColorsList, setCheckedColorsList] = useState([]);
    const [checkedSizesList, setCheckedSizesList] = useState([]);

    useEffect(() => {
        getCategories();
        getColors();
        getSizes();
    }, []);

    useEffect(() => {
        if (editedProduct) {
            form.setFieldsValue(editedProduct); //если товар существует (редактирование) записываются его данные в форму. Если же мы только создаем товар, то форма пустая
            setCheckedColorsList(editedProduct["product_colors"]?.map(item => { return item.color_id }))
            setCheckedSizesList(editedProduct["product_sizes"]?.map(item => { return item.size_id }))
            setFileList([{ url: editedProduct.image }])
        }


    }, [editedProduct, form])

    const getCategories = async () => {
        const { data } = await axios.get('/api/categories');
        const items = data.map(item => { return { value: item.id, label: item.name } })
        setCategories(items);
    }

    const getColors = async () => {
        const { data } = await axios.get('/api/colors');
        const items = data.map(item => { return { value: item.id, label: item.name } })
        setColors(items);
    }

    const getSizes = async () => {
        const { data } = await axios.get('/api/sizes');
        const items = data.map(item => { return { value: item.id, label: item.name } })
        setSizes(items);
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
    console.log("editedProduct in FormProduct: ", editedProduct)

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
                let colorsWithNames = [];
                checkedColorsList.map(colorId => {
                    colors.map(item => {
                        if (item.value === colorId) {
                            colorsWithNames = [...colorsWithNames, JSON.stringify({ color_id: item.value, color_name: item.label })];
                        }
                    })
                });


                let sizesWithNames = [];
                checkedSizesList.map(sizeId => {
                    sizes.map(item => {
                        if (item.value === sizeId) {
                            sizesWithNames = [...sizesWithNames, JSON.stringify({ size_id: item.value, size_name: item.label })];
                        }
                    })
                });

                editProduct ? editProduct(editedProduct.id, { ...values, "product_colors[]": colorsWithNames, "product_sizes[]": sizesWithNames },) : submitHandler({ ...values, "product_colors[]": colorsWithNames, "product_sizes[]": sizesWithNames });
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

            <Form.Item label="Colors" name="product_colors[]" valuePropName="checked_colors">
                <Checkbox.Group
                    style={{
                        width: '100%',
                    }}
                    onChange={(list) => setCheckedColorsList(list)}
                    value={checkedColorsList}
                >
                    <Row>
                        {colors.map((color) => {
                            return (
                                <Col span={8} key={color.value}>
                                    <Checkbox value={color.value}>{color.label}</Checkbox>
                                </Col>
                            )
                        })}
                    </Row>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item label="Sizes" name="product_sizes[]" valuePropName="checked_sizes">
                <Checkbox.Group
                    style={{
                        width: '100%',
                    }}
                    onChange={(list) => setCheckedSizesList(list)}
                    value={checkedSizesList}
                >
                    <Row>
                        {sizes.map((size) => {
                            return (
                                <Col span={8} key={size.value}>

                                    <Checkbox value={size.value}>{size.label}</Checkbox>
                                </Col>
                            )
                        })}
                    </Row>
                </Checkbox.Group>
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
