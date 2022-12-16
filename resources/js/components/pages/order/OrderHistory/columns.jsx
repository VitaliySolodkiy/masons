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
            title: "Products count",
            key: "products_count",
            render: (order) => order.order_products.length
        },
        {
            title: "Total",
            key: "total_sum",
            sorter: {
                compare: (a, b) => {
                    let totalA = a.order_products.reduce((sum, elem) => sum + elem.product_price * elem.product_amount, 0);
                    let totalB = b.order_products.reduce((sum, elem) => sum + elem.product_price * elem.product_amount, 0);
                    return totalA - totalB;
                },

            },
            render: (order) => order.order_products.reduce((sum, elem) => sum + elem.product_price * elem.product_amount, 0)
        },
        {
            title: "Create date",
            key: "created_at",
            sorter: {
                compare: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
            },
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