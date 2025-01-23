import React, { useState, useEffect } from 'react';
import { Table, Button, Layout, Typography, Input, Space } from 'antd';
import { SearchOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import './CustomerList.css';

const { Content, Footer } = Layout;
const { Title } = Typography;

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Fetch customers from an API or database (mock data for now)
        const fetchCustomers = async () => {
            const data = [
                { key: '1', name: 'John Doe', phone: '123-456-7890', address: '123 Main St', points: 50 },
                { key: '2', name: 'Jane Smith', phone: '987-654-3210', address: '456 Elm St', points: 75 },
                { key: '3', name: 'Sam Wilson', phone: '555-666-7777', address: '789 Oak St', points: 30 }
            ];
            setCustomers(data);
        };
        fetchCustomers();
    }, []);

    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchText) ||
        customer.phone.includes(searchText) ||
        customer.address.toLowerCase().includes(searchText)
    );

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Points', dataIndex: 'points', key: 'points' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} type="default" title="View" />
                    <Button icon={<EditOutlined />} type="primary" title="Edit" />
                    <Button icon={<DeleteOutlined />} type="danger" title="Delete" />
                </Space>
            )
        }
    ];

    return (
        <Layout className="customer-list-layout">
            <Content className="customer-list-container">
                <Title level={2} className="customer-list-title">Customer List</Title>
                <Input
                    placeholder="Search customers..."
                    prefix={<SearchOutlined />}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                />
                <Table columns={columns} dataSource={filteredCustomers} className="customer-table" />
            </Content>
            <Footer className="site-layout-footer">
                Made with <span style={{ color: 'red' }}>❤️</span> by Weblux Digi. All rights reserved.
            </Footer>
        </Layout>
    );
};

export default CustomerList;
