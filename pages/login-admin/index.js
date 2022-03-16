import React, { useEffect } from 'react';
import { actLogin, actLoginAdmin } from '../../redux/actions/UserManagementActions';

import styled from "styled-components";
import { useFormik } from 'formik';

import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../api/user';
import { useRouter } from 'next/router';


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});


const LoginContainer = styled.div`
position: relative;
width: 100vw;
height: 100vh;
.form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    background-color: aquamarine;
    border-radius: 10px;
    & > div {
        padding-bottom: 20px;
    }
}
`;

const Login = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { error } = useSelector(state => state.userManagementReducer);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SignupSchema
        ,
        onSubmit: values => {
            dispatch(actLoginAdmin(values, router));
        },
    });
    const { errors, touched } = formik;

    useEffect(() => {
        if (error?.response?.data?.content) {
            message.error(error.response.data.content);
        }
    }, [error]);


    return (
        <LoginContainer>

            <form className='form' onSubmit={formik.handleSubmit} >
                <div>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        className='custom'
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}

                </div>
                <div>

                    <input
                        id="password"
                        className='custom'
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}

                </div>

                <button type="submit">Login</button>
            </form>

        </LoginContainer >
    );
};

export default Login;