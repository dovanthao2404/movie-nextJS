import React from 'react';
import AdminTemplate from '../../../components/AdminTemplate/AdminTemplate';

import { useEffect, useState } from 'react';
import { Table, } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
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


const apiCreateMovie = "https://json-serve-hihi.herokuapp.com/api/v1/movies/";

const AddMovie = () => {
    const { userLogin } = useSelector(state => state.userManagementReducer);


    const formik = useFormik({
        initialValues: {
            "name": "",
            "trailer": "",
            "description": "",
            "isHot": false,
            "isNowShowing": false,
        },
        onSubmit: (values) => {
            (async () => {
                try {
                    await axios.post(apiCreateMovie, values, {
                        headers: {
                            token: userLogin?.token
                        }
                    });
                    formik.resetForm();
                } catch (error) {

                }
            })();
        }
    });


    return (
        <AdminTemplate>
            <Box>
                <Box
                    component="form"

                    sx={{
                        width: "600px",
                        padding: "40px",
                        boxSizing: "border-box"
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Box component="h2" >Add movie</Box>
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
                    <div>
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
                    </div>
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
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>

                        <Button variant="contained" type="submit">Create Movie</Button>
                    </Box>
                </Box>
            </Box>
        </AdminTemplate>
    );
};

export default AddMovie;