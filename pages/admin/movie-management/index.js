import React, { useEffect, useState } from 'react';
import { Table, } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AdminTemplate from '../../../components/AdminTemplate/AdminTemplate';
import { ButtonCommon } from '../../../components/common/Button';
import Dialog from '@mui/material/Dialog';
import { useFormik } from 'formik';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const apiGetMovie = "https://json-serve-hihi.herokuapp.com/api/v1/movies";
const apiDeleteAndUpdateMovie = "https://json-serve-hihi.herokuapp.com/api/v1/movies/";


const MovieManagement = () => {


    const [data, setData] = useState([]);
    const { userLogin } = useSelector(state => state.userManagementReducer);
    const [open, setOpen] = useState(false);





    const getData = async () => {
        const result = await axios.get(apiGetMovie);
        setData(result.data);
    };

    const formik = useFormik({
        initialValues: {
            "name": "",
            "trailer": "",
            "description": "",
            "isHot": false,
            "isNowShowing": false,
            id: -1
        },
        onSubmit: (values) => {
            (async () => {
                await axios.put(`${apiDeleteAndUpdateMovie}${values.id}`);
                getData();
                setOpen(false);
            });
        }
    });


    useEffect(() => {
        getData();
    }, []);


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
            title: 'description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'trailer',
            key: 'trailer',
            dataIndex: 'trailer'
        },
        {
            title: 'poster',
            key: 'poster',
            dataIndex: 'poster',
            render: (value) => {
                return <>
                    <img
                        onError={(e) => {
                            e.target.src = "/broken-1.png";
                        }}
                        style={{
                            height: 150,
                            width: 100,
                            objectFit: "cover"
                        }} src={value} alt={value} />
                </>;
            }
        },
        {
            title: 'Actions',
            render: (value, item, index) => {

                const handleDelete = async () => {
                    try {
                        await axios.delete(`${apiDeleteAndUpdateMovie}${item.id}`, {
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

    const handleClickOpen = (item) => {
        setOpen(true);
        formik.setFieldValue("name", item.name);
        formik.setFieldValue("trailer", item.trailer);
        formik.setFieldValue("description", item.description);
        formik.setFieldValue("isHot", item.isHot);
        formik.setFieldValue("isNowShowing", item.isNowShowing);
        formik.setFieldValue("id", item.id);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        label="Trailer"
                        sx={{
                            width: "100%",
                            mb: "20px"
                        }}
                        name="trailer"
                        onChange={formik.handleChange}
                        value={formik.values.trailer}

                    />
                    <br />
                    <TextareaAutosize
                        maxRows={6}
                        placeholder='Description'
                        style={{ width: "100%", height: 200 }}
                        sx={{
                            mb: "20px"
                        }}
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    <br />
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Hot</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            onChange={formik.handleChange}
                            name="isHot"
                            value={formik.values.isHot}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="True" />
                            <FormControlLabel value={false} control={<Radio />} label="False" />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Now show</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            onChange={formik.handleChange}
                            name="isNowShowing"
                            value={formik.values.isNowShowing}

                        >
                            <FormControlLabel value={true} control={<Radio />} label="True" />
                            <FormControlLabel value={false} control={<Radio />} label="False" />
                        </RadioGroup>
                    </FormControl>
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
        </AdminTemplate >
    );
};

export default MovieManagement;