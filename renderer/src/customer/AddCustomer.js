import React, { useState, useRef } from 'react';
import { Typography, Form, Input, Button, DatePicker, InputNumber, Row, Col, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Webcam from "react-webcam";
import './AddCustomer.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const AddCustomer = ({ onSubmit, onBack }) => {
    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    return (
        <div className="add-customer-container">
            <Button type="text" onClick={onBack} className="back-button-dash">
                <ArrowLeftOutlined /> Back
            </Button>
            
            <Title level={2} className="customer-title">Add Customer</Title>
            
            <Row gutter={24} className="content-row">
                <Col xs={24} md={10} className="camera-section">
                    <Card className="camera-card modern-shadow">
                        <Title level={4} className="camera-title">Capture Picture</Title>
                        <div className="camera-container">
                            {capturedImage ? (
                                <img src={capturedImage} alt="Captured" className="captured-image" />
                            ) : (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="webcam"
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                            )}
                            <Button type="primary" onClick={captureImage} className="capture-btn">
                                {capturedImage ? "Retake Picture" : "Capture Picture"}
                            </Button>
                        </div>
                    </Card>
                    <Card className="rfid-card modern-shadow">
                        <Title level={4} className="rfid-title">RFID Listening</Title>
                        <div className="rfid-wave-container">
                            <div className="wave"></div>
                            <div className="wave"></div>
                            <div className="wave"></div>
                        </div>
                        <p className="rfid-description">Waiting for RFID scan...</p>
                        <Button type="primary" className="rfid-btn">Start Listening</Button>
                        <div className="rfid-status">
                            <p><strong>Status:</strong> <span className="status-indicator">Inactive</span></p>
                        </div>
                    </Card>
                </Col>
                
                <Col xs={24} md={14} className="form-section">
                    <Card className="form-card modern-shadow">
                        <Title level={4} className="form-title">Register New Customer</Title>
                        <Paragraph className="form-description">
                            Fill in the details below to register a new customer.
                        </Paragraph>
                        <div className="form-scroll">
                            <Form
                                layout="vertical"
                                onFinish={(values) => {
                                    values.image = capturedImage;
                                    onSubmit(values);
                                }}
                            >
                                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter the first name!' }]}> 
                                    <Input placeholder="Enter first name" />
                                </Form.Item>
                                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter the last name!' }]}> 
                                    <Input placeholder="Enter last name" />
                                </Form.Item>
                                <Form.Item label="Birthdate" name="birthdate" rules={[{ required: true, message: 'Please select the birthdate!' }]}> 
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please enter the phone number!' }]}> 
                                    <Input placeholder="Enter phone number" />
                                </Form.Item>
                                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter the address!' }]}> 
                                    <Input placeholder="Enter address" />
                                </Form.Item>
                                <Form.Item label="Points" name="points" rules={[{ required: true, message: 'Please enter the points!' }]}> 
                                    <InputNumber placeholder="Enter points" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item label="Comments" name="comments" rules={[{ required: true, message: 'Please add a comment!' }]}> 
                                    <TextArea rows={3} placeholder="Add comments" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="submit-btn" block>
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Card>
                </Col>
            </Row>
           
            
            
        </div>
    );
};

export default AddCustomer;
