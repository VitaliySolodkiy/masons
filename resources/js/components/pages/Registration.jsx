import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import AuthUserContext from '../../contexts/AuthUserContext';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Registration = () => {
    const [form] = Form.useForm();
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        console.log("form values: ", values)
        const response = await axios.post("api/registration", values);
        console.log(response);

        if (!response.data.success) {
            form.setFields([
                {
                    name: "email",
                    errors: response.data.errors.email
                },
            ]);
            return;
        }
        navigate('/login');
    }

    return (
        <>
            <div className="login">
                <div className="login__container _container">
                    <div className="login__container-background"></div>
                    <div className="login__title"><h5>Sign up</h5></div>


                    {authUser
                        ? <p>You are already logged in!</p>
                        : <>
                            <div className="login__registration-link"><Link to={'/login'}>Already registered?</Link></div>
                            <div className="login-form">
                                <Form name="registration" onFinish={submitHandler} form={form}>
                                    <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }, { min: 3 }]}>
                                        <Input placeholder="Name" />
                                    </Form.Item>
                                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }, { email: true }]}>
                                        <Input placeholder="Email" />
                                    </Form.Item>

                                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                        <Input.Password placeholder="Password" />
                                    </Form.Item>
                                    <Form.Item name="confirm" dependencies={['password']}
                                        rules={[
                                            { required: true, message: 'Please confirm your password!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                },
                                            }),
                                        ]} >
                                        <Input.Password placeholder="Password confirmation" />
                                    </Form.Item>

                                    <Form.Item
                                        name="phone"

                                    >
                                        <Input placeholder="Phone" type='phone' />
                                    </Form.Item>
                                    <Form.Item
                                        name="city"

                                    >
                                        <Input placeholder="City" type='text' />
                                    </Form.Item>

                                    <Form.Item className='login-form__button-wrapper'>
                                        <Button htmlType="submit" type="primary">Sign up</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </>
                    }


                </div>
            </div>
            <div className="container ">
                <h2 className="my-3">Registration</h2>
                {authUser
                    ? <h3>You are already logged in!</h3>
                    : <Form name="login" className="w-50" form={form} onFinish={submitHandler}>
                        <Form.Item label="Name" name="name" rules={[{ required: true }, { min: 3 }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true }, { type: 'email' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item >
                            <Button htmlType="submit" type="primary">Log in</Button>
                        </Form.Item>
                    </Form>
                }
            </div>
        </>

    );
}

export default Registration;
