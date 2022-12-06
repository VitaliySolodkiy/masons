import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

const getColumns = (removeReview, setIsEditModalOpen, setEditedReview) => {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
                <div>
                    <EditOutlined
                        style={{ fontSize: '25px', color: '#00D678', paddingRight: '10px' }}
                        onClick={() => {
                            setIsEditModalOpen(true);
                            setEditedReview(review);
                        }}
                    />

                    <DeleteOutlined
                        style={{ fontSize: '25px', color: '#f00' }}
                        onClick={() => removeReview(review.id)}
                    />
                </div>
            ),
        },
    ];
    return columns;
}



export default getColumns