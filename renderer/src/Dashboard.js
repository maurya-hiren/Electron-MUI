import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Layout,
    Menu,
    Typography,
    Button,
    Card,
    Row,
    Col,
    Divider,
    Space,
    Modal,
} from 'antd';
import {
    DashboardOutlined,
    SettingOutlined,
    LogoutOutlined,
    UserAddOutlined,
    SearchOutlined,
    UnorderedListOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    EyeOutlined,
    SoundOutlined,
    AudioMutedOutlined,
    ClockCircleOutlined,
    HeartFilled,
} from '@ant-design/icons';
import AddCustomer from './customer/AddCustomer'; // Import the AddCustomer component
import CustomerList from './customer/CustomerList';
import './Dashboard.css';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

function DashboardPage() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [voiceActive, setVoiceActive] = useState(false);
    const [activeSection, setActiveSection] = useState(''); // Tracks the active section

    const handleLogout = () => {
        navigate('/'); // Redirect to the welcome page
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const toggleVoice = () => {
        const message = voiceActive
            ? 'Voice Deactivated'
            : 'Voice Activated';
        setVoiceActive(!voiceActive);

        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    };

    const cards1 = [
        {
            title: 'Add Customer',
            icon: <UserAddOutlined />,
            action: () => setActiveSection('addCustomer'),
        },
        { 
            title: 'Customer List',
            icon: <UnorderedListOutlined />,
            action: () => setActiveSection('customerList'),
        },
        { title: 'Search Customer', icon: <SearchOutlined />, action: () => console.log('Search Customer') },
        { title: 'Visitor Window', icon: <EyeOutlined />, action: () => console.log('Visitor Window') },
    ];

    const cards2 = [
        { title: 'Add Employee', icon: <UserAddOutlined />, action: () => console.log('Add Employee') },
        { title: 'Employee List', icon: <UnorderedListOutlined />, action: () => console.log('Employee List') },
        { title: 'Search Employee', icon: <SearchOutlined />, action: () => console.log('Search Employee') },
        { title: 'Settings', icon: <SettingOutlined />, action: () => console.log('Settings') },
    ];

    return (
        <Layout className="dashboard-layout">
            {/* Sidebar */}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">Weblux</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SettingOutlined />}>
                        Settings
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Main Content */}
            <Layout className="site-layout">
                {/* Header */}
                <Header className="site-layout-header">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapse}
                        style={{ fontSize: '16px', color: 'white' }}
                    />
                    <Title level={4} className="header-title" style={{ color: 'white' }}>
                        Weblux Manage Dashboard
                    </Title>

                    {/* Additional Icons */}
                    <div className="header-icons">
                        <Button
                            type="text"
                            icon={voiceActive ? <SoundOutlined /> : <AudioMutedOutlined />}
                            title={voiceActive ? 'Deactivate Voice' : 'Activate Voice'}
                            style={{ color: 'white', fontSize: '18px' }}
                            onClick={toggleVoice}
                        />
                        <Button
                            type="text"
                            icon={<ClockCircleOutlined />}
                            title="View Time"
                            style={{ color: 'white', fontSize: '18px' }}
                            onClick={showModal}
                        />
                        <Button
                            type="primary"
                            danger
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </Button>
                    </div>
                </Header>

                {/* Content */}
                <Content className="site-layout-content">
                    {/* <Title level={2} className="dashboard-title">
                        Welcome to Weblux Manage Dashboard!
                    </Title> */}

                    {/* Render Active Section */}
                    {
                    activeSection === 'addCustomer' ? (
                        <AddCustomer
                            onSubmit={(values) => {
                                console.log('Customer Data:', values);
                                setActiveSection('');
                            }}
                            onBack={() => setActiveSection('')}
                        />
                    ) :
                    
                    activeSection === 'customerList' ? (
                        <CustomerList
                            onSubmit={(values) => {
                                console.log('Customer Data:', values);
                                setActiveSection('');
                            }}
                            onBack={() => setActiveSection('')}
                        />
                    ) :(
                        <>
                            <Row gutter={[16, 16]}>
                                {cards1.map((card, index) => (
                                    <Col xs={24} sm={12} md={6} key={index}>
                                        <Card
                                            hoverable
                                            className="dashboard-card"
                                            onClick={card.action}
                                            style={{ textAlign: 'center' }}
                                        >
                                            <Space direction="vertical" align="center" size="large">
                                                {card.icon}
                                                <Title level={5}>{card.title}</Title>
                                            </Space>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <Divider />

                            <Row gutter={[16, 16]}>
                                {cards2.map((card, index) => (
                                    <Col xs={24} sm={12} md={6} key={index}>
                                        <Card
                                            hoverable
                                            className="dashboard-card"
                                            onClick={card.action}
                                            style={{ textAlign: 'center' }}
                                        >
                                            <Space direction="vertical" align="center" size="large">
                                                {card.icon}
                                                <Title level={5}>{card.title}</Title>
                                            </Space>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Content>

                {/* Footer */}
                <Footer className="site-layout-footer">
                    Made with <HeartFilled style={{ color: 'red' }} /> by Weblux Digi. All rights reserved.
                </Footer>
            </Layout>

            {/* Time Modal */}
            <Modal
                title="System Information"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
            >
                <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Year:</strong> {new Date().getFullYear()}</p>
                <p><strong>Calendar:</strong> {new Date().toString()}</p>
                <p><strong>System IP:</strong> 192.168.1.1</p>
            </Modal>
        </Layout>
    );
}

export default DashboardPage;
