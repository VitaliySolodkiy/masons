import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import AuthUserContext from '../../contexts/AuthUserContext';
import { useState } from 'react';

const Login = () => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const navigate = useNavigate();

    const [error, setError] = useState();

    const submitHandler = async (values) => {
        const response = await axios.post('/api/login', values);
        if (response.data.errors) {
            setError(response.data.errors);
            return;
        }

        setAuthUser(response.data);
        localStorage.setItem('authUser', JSON.stringify(response.data));
        navigate('/');
    }

    return (
        <div className="container ">
            <h2 className="my-3">Login</h2>
            <p style={{ color: 'red' }}>{error}</p>
            <Form name="login" onFinish={submitHandler} className="w-50">
                <Form.Item label="Email" name="email" rules={[{ required: true }, { email: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item >
                    <Button htmlType="submit" type="primary">Log in</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
