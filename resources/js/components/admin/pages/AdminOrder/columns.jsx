import { EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import moment from 'moment';
import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';

const getColumns = (removeOrder) => {

    const dateFormat = (str = '') => {
        return moment(str).utc().format("YYYY-MM-DD, HH:mm:ss")
    }

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                            textTransform: 'initial',
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                            textTransform: 'initial',
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        style={{
                            textTransform: 'initial',
                        }}
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        style={{
                            textTransform: 'initial',
                        }}
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#ffc107' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Order number",
            dataIndex: "id",
            key: "id",
            ...getColumnSearchProps('id'),
        },
        {
            title: "Total",
            key: "total_sum",
            render: (order) => order.order_products.reduce((sum, elem) => sum + elem.product_price * elem.product_amount, 0)
        },
        {
            title: "User email",
            dataIndex: "user_email",
            key: "total_sum",
            ...getColumnSearchProps('user_email'),
        },
        {
            title: "User Phone",
            dataIndex: "user_phone",
            key: "user_phone",
            ...getColumnSearchProps('user_phone'),
        },
        {
            title: "Create",
            key: "created_at",
            render: (order) => dateFormat(order.created_at)
        },
        {
            title: "Action",
            key: "action",
            render: (order) => (
                <div>
                    <Link to={`/admin/orders/${order.id}`}><EyeOutlined style={{ fontSize: '25px', paddingRight: '10px' }} /></Link>
                    <DeleteOutlined
                        style={{ fontSize: '25px', color: 'rgb(255 106 0)' }}
                        onClick={() => removeOrder(order.id)}
                    />
                </div>
            )
        },
    ];
    return columns;
};

export default getColumns;