import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

const getColumns = () => {

    const dateFormat = (str = '') => {
        return moment(str).utc().format("YYYY-MM-DD, HH:mm:ss")
    }

    const columns = [
        {
            title: "Order number",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Total",
            dataIndex: "total_sum",
            key: "total_sum",
        },
        {
            title: "User email",
            dataIndex: "user_email",
            key: "total_sum",
        },
        {
            title: "User Phone",
            dataIndex: "user_phone",
            key: "user_phone",
        },
        {
            title: "Create date",
            key: "created_at",
            render: (order) => dateFormat(order.created_at)
        },
        {
            title: "Order Details",
            key: "action",
            render: (order) => (
                <div>
                    <Link to={`/order-history/${order.id}`}><EyeOutlined style={{ fontSize: '25px', paddingRight: '10px' }} /></Link>
                </div>
            )
        },
    ];
    return columns;
};

export default getColumns;