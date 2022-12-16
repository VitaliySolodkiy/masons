import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const getColumns = (removeProduct, setIsEditModalOpen, setEditedProduct) => {
    const columns = [
        {
            title: "Image",
            key: "image",
            render: (product) => <Avatar src={product.image} shape="square" size={70} />

        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Category",
            key: "category",
            render: (product) => product.category.name
        },
        {
            title: "Action",
            key: "action",
            render: (product) => (
                <div>
                    <EditOutlined
                        style={{ fontSize: '25px', color: 'rgb(255 187 23)', paddingRight: '10px' }}
                        onClick={() => {
                            setIsEditModalOpen(true);
                            setEditedProduct(product);
                        }}
                    />

                    <DeleteOutlined
                        style={{ fontSize: '25px', color: 'rgb(255 106 0)' }}
                        onClick={() => removeProduct(product.id)}
                    />
                </div>
            ),
        },
    ];
    return columns;
}



export default getColumns