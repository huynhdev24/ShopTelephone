import React, { useEffect } from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Wrapper, Content } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
import { useHistory } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address!").required("Email is required!"),
        password: Yup.string().min(3, "Password must be at least 3 characters!").required("Password is required!"),
    });

    const handleSubmit = (values) => {
        dispatch(loginAsync(values)).then((res) => {
            console.log(res);
            console.log(res.payload?.isAdmin);
            if (res.payload?.isAdmin) {
                return history.push("/dashboard");
            }
            return window.alert("Wrong account")
        });
    };

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/dashboard");
        } else {
            history.push("/login");
        }
    }, [history, isAuthenticated]);

    return (
        <Wrapper>
            <Content>
                <h1>Login</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <FastField
                                    // Formik's props
                                    name='email'
                                    component={Input}
                                    // Additional props
                                    label='Email'
                                    type='email'
                                    placeholder=''
                                    disable={false}
                                />

                                <FastField
                                    // Formik's props
                                    name='password'
                                    component={Input}
                                    // Additional props
                                    label='Password'
                                    type='password'
                                    placeholder=''
                                    disable={false}
                                />

                                <Button type='submit' block>
                                    Login
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default Login;
