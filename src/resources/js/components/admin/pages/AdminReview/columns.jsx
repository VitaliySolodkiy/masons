import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

const getColumns = (removeReview, setIsEditModalOpen, setEditedReview) => {
    const columns = [
        {
            title: "User name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Product",
            key: "name",
            render: (review) => review.product?.name
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
        },
        {
            title: "Action",
            key: "action",
            render: (review) => (
                <div className='admin-review__action'>
                    <EditOutlined
                        style={{ fontSize: '25px', color: 'rgb(255 187 23)', paddingRight: '10px' }}
                        onClick={() => {
                            setIsEditModalOpen(true);
                            setEditedReview(review);
                        }}
                    />

                    <DeleteOutlined
                        style={{ fontSize: '25px', color: 'rgb(255 106 0)' }}
                        onClick={() => removeReview(review.id)}
                    />
                </div>
            ),
        },
    ];
    return columns;
}



export default getColumns