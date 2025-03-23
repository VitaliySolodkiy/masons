import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import AuthUserContext from '../../contexts/AuthUserContext';
import { useState } from 'react';
import { Link } from "react-router-dom";

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
        <>
            <div className="login">
                <div className="login__container _container">
                    <div className="login__container-background"></div>
                    <div className="login__title"><h5>Sign in</h5></div>
                    <div className="login__registration-link"><Link to={'/registration'}>I don't have an account yet</Link></div>

                    <div className="login-form">
                        <p style={{ color: 'red' }}>{error}</p>
                        <Form name="login" onFinish={submitHandler} >
                            <Form.Item name="email" rules={[{ required: true }, { email: true }]}>
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item name="password" rules={[{ required: true }]}>
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item className='login-form__button-wrapper'>
                                <Button htmlType="submit" type="primary">Log in</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Login;
