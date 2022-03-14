import React from 'react';
import { actLogin } from '../../redux/actions/UserManagementActions';

import styled from "styled-components";


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


    return (
        <LoginContainer>
            <form className='form' >
                <div>
                    <input
                        id="taiKhoan"
                        name="taiKhoan"
                        type="text"
                        placeholder="Tài khoản"
                    />

                </div>
                <div>

                    <input
                        id="matKhau"
                        name="matKhau"
                        type="password"
                        placeholder="Mật khẩu"
                    />

                </div>

                <button type="submit">Đăng nhập</button>
            </form>
        </LoginContainer>
    );
};

export default Login;