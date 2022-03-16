import React, { useEffect, useState } from 'react';
import AdminTemplate from '../../../components/AdminTemplate/AdminTemplate';
import { Table, } from 'antd';
import { ButtonCommon } from '../../../components/common/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


import Dialog from '@mui/material/Dialog';
import { useFormik } from 'formik';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const apiGetUser = "https://json-serve-hihi.herokuapp.com/api/v1/users";
const apiUploadAvatar = "https://json-serve-hihi.herokuapp.com/api/v1/users/upload-avatar/";
const apiDeleteAndUpdateUser = "https://json-serve-hihi.herokuapp.com/api/v1/users/";



const UserManagement = () => {
    const { userLogin } = useSelector(state => state.userManagementReducer);

    const [data, setData] = useState([]);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const getData = async () => {
        const result = await axios.get(apiGetUser,
            {
                headers: {
                    token: userLogin?.token

                }
            });
        setData(result.data);
    };


    useEffect(() => {
        getData();
    }, []);


    const formik = useFormik({
        initialValues: {
            "name": "",
            "phoneNumber": "",
            "dateOfBirth": new Date(),
            "roles": "",
            id: -1
        },
        onSubmit: (values) => {
            (async () => {
                try {
                    await axios.put(`${apiDeleteAndUpdateUser}${values.id}`, values, {
                        headers: {
                            token: userLogin?.token
                        }
                    });
                    getData();
                    setOpen(false);
                } catch (error) {

                }
            })();
        }
    });



    const handleClickOpen = (item) => {
        setOpen(true);
        formik.setFieldValue("name", item.name);
        formik.setFieldValue("phoneNumber", item.phoneNumber);
        formik.setFieldValue("dateOfBirth", item.dateOfBirth);
        formik.setFieldValue("roles", item.roles);
        formik.setFieldValue("id", item.id);
    };

    const columns = [
        {
            title: 'id',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: 'name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'phoneNumber',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'roles',
            key: 'roles',
            dataIndex: 'roles'
        },
        {
            title: 'avatar',
            key: 'avatar',
            dataIndex: 'avatar',
            render: (value, item) => {
                const handleChangeFile = async (e) => {
                    try {
                        const formData = new FormData();
                        const { name, files } = e.target;
                        const file = files[0];
                        formData.append(name, file, file.name);
                        await axios.post(`${apiUploadAvatar}${item.id}`, formData, {
                            headers: {
                                token: userLogin?.token
                            }
                        });
                        getData();
                    } catch (error) {
                        console.log(error);
                    }

                };

                return <>
                    <label htmlFor={`image-${item.id}`}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            onError={(e) => {
                                e.target.src = "/broken-1.png";
                            }}
                            style={{
                                height: 150,
                                width: 100,
                                objectFit: "cover"
                            }} src={value} alt={value} />
                    </label>
                    <input onChange={handleChangeFile} type="file" id={`image-${item.id}`} name="image" style={{
                        display: "none"
                    }} />
                </>;
            }
        },
        {
            title: 'Actions',
            render: (value, item, index) => {

                const handleDelete = async () => {
                    try {
                        await axios.delete(`${apiDeleteAndUpdateUser}${item.id}`, {
                            headers: {
                                token: userLogin?.token
                            }
                        });
                        getData();
                    } catch (error) {
                        alert(error.response?.data?.messages);
                    }
                };

                return <>
                    <ButtonCommon
                        color={"#ffff"}
                        bgColor={"red"}
                        borderColor={"red"}
                        text={"Delete"}
                        onClick={handleDelete} />
                    <ButtonCommon
                        text={"Edit"} onClick={() => {
                            handleClickOpen(item);
                        }} />


                </>;
            }
        },


    ];

    return (
        <AdminTemplate>

            <Table columns={columns} dataSource={data}
                pagination={{
                    position: ["bottomCenter"]
                }}
                rowKey={"id"}
            />

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box
                    component="form"

                    sx={{
                        width: "600px",
                        padding: "40px"
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Box component="h2" >Edit user</Box>
                    <TextField
                        label="Name"
                        sx={{
                            width: "100%",
                            mb: "20px"
                        }}
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <br />
                    <TextField
                        label="Phone number"
                        sx={{
                            width: "100%",
                            mb: "20px"
                        }}
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}

                    />
                    <br />
                    <DesktopDatePicker
                        label="Birthday"
                        value={formik.values.dateOfBirth}
                        onChange={(e) => {
                            formik.setFieldValue("dateOfBirth", e);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <br />
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Roles</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            onChange={formik.handleChange}
                            name="roles"
                            value={formik.values.roles}
                        >
                            <FormControlLabel value={"ADMIN"} control={<Radio />} label="Admin" />
                            <FormControlLabel value={"CLIENT"} control={<Radio />} label="Client" />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <br />
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>

                        <Button sx={{ marginRight: "10px" }} variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" type="submit">Update</Button>
                    </Box>
                </Box>
            </Dialog>
        </AdminTemplate>
    );
};

export default UserManagement;