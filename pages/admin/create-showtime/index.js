import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import AdminTemplate from '../../../components/AdminTemplate/AdminTemplate';
import { InputNumber } from 'antd';

import { DatePicker } from 'antd';
import moment from "moment";
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DropdownCustom from '../../../components/common/DropdownCustom';
import { ButtonCommon } from '../../../components/common/Button';
import { useSelector } from 'react-redux';


const apiGetMovie = "https://json-serve-hihi.herokuapp.com/api/v1/movies";
const apiGetCineplex = "https://json-serve-hihi.herokuapp.com/api/v1/cineplex/";
const apiGetCinemaByCineplexId = "https://json-serve-hihi.herokuapp.com/api/v1/cineplex/cinema/";
const apiGetRoomByCinemaId = "https://json-serve-hihi.herokuapp.com/api/v1/cinemas/room/";

const apiCreateShowtime = "https://json-serve-hihi.herokuapp.com/api/v1/showtimes/";

const CreateShowtime = () => {

    const { userLogin } = useSelector(state => state.userManagementReducer);


    const [cineplexData, setCineplexData] = useState();
    const [cinemaData, setCinemaData] = useState();
    const [listMovie, setListMovie] = useState();
    const [roomData, setRoomData] = useState();


    //  ==============================
    const [movie, setMovie] = useState();
    const [cineplex, setCineplex] = useState();
    const [cinema, setCinema] = useState();
    const [room, setRoom] = useState();
    const [date, setDate] = useState(new Date());
    const [priceNormal, setPriceNormal] = useState(50000);
    const [priceVip, setPriceVip] = useState(50000);



    useEffect(() => {
        ; (async () => {
            try {
                const result = await axios.get(apiGetMovie);
                setListMovie(result.data);
            } catch (error) {

            }
        })();
    }, []);

    useEffect(() => {
        ; (async () => {
            try {
                const result = await axios.get(apiGetCineplex);
                setCineplexData(result.data);
                setCineplex(undefined);
            } catch (error) {

            }
        })();
    }, []);



    useEffect(() => {
        if (cineplex?.key?.id) {
            ; (async () => {
                try {
                    const result = await axios.get(apiGetCinemaByCineplexId + cineplex.key.id);
                    setCinemaData(result.data.Cinemas);
                    setCinema(undefined);
                } catch (error) {

                }
            })();
        } else {
            setRoomData(undefined);
        }
    }, [cineplex]);

    useEffect(() => {
        if (cinema?.key?.id) {
            ; (async () => {
                try {
                    const result = await axios.get(apiGetRoomByCinemaId + cinema.key.id);
                    setRoomData(result.data.Rooms);

                } catch (error) {

                }
            })();
        } else {
            setRoomData(undefined);

        }
    }, [cinema]);


    function handleMenuClick(e) {
        setMovie(e);
    }

    const handleClickCineplex = (e) => {
        setCineplex(e);
    };

    const handleClickCinema = (e) => {
        setCinema(e);

    };

    const handleClickRoom = (e) => {
        setRoom(e);

    };

    const handleAddShowtime = (e) => {



        const valid = movie && room && cineplex && cinema && date && priceNormal && priceVip;
        if (valid) {
            const dateFormat = moment(date).format("YYYY-MM-DD hh:mm:ss");
            const dataPush = {
                movieId: movie?.key?.id,
                movieName: movie?.key?.name,
                roomId: room?.key?.id,
                movieShowtime: dateFormat,
                priceNormal,
                priceVip
            };
            ; (async () => {
                try {
                    const result = await axios.post(apiCreateShowtime, dataPush, {
                        headers: {
                            token: userLogin?.token
                        }
                    });
                    setMovie(undefined);
                    setCineplex(undefined);
                    setCinema(undefined);
                    setRoom(undefined);
                    setDate(new Date());
                    setPriceNormal(50000);
                    setPriceVip(50000);
                    message.success(result.data.message);
                } catch (error) {

                }
            })();
        }
    };

    return (
        <AdminTemplate >
            <Box component="h2" >Add movie</Box>


            <DropdownCustom data={listMovie} onClick={handleMenuClick} label="Movie" defaultText={'Select movie'} />
            <br />
            <DropdownCustom data={cineplexData} onClick={handleClickCineplex} label="Cineplex" defaultText={'Select cineplex'} />
            <br />
            <DropdownCustom data={cinemaData} onClick={handleClickCinema} label="Cinema" defaultText={'Select cinema'} />
            <br />

            <DropdownCustom data={roomData} onClick={handleClickRoom} label="Room" defaultText={'Select Room'} />
            <br />
            <div>
                <Box sx={{ mr: 1, minWidth: "100px", display: "inline-block" }} component="label">Time</Box>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"

                    onChange={(e, timeStringChange) => {
                        if (!timeStringChange) {
                            setDate(moment('00:00:00', 'HH:mm:ss'));
                            return;
                        }
                        const timeString = moment(e);
                        setDate(timeString._d);
                    }}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    value={moment(date)}
                />
            </div>
            <br />
            <div>
                <Box sx={{ mr: 1, minWidth: "100px", display: "inline-block" }} component="label">Price</Box>
                <InputNumber min={50000} max={150000} value={priceNormal} onInput={(e) => {
                    setPriceNormal(e);
                }} />
            </div>
            <br />
            <div>
                <Box sx={{ mr: 1, minWidth: "100px", display: "inline-block" }} component="label">Price Seat Vip</Box>
                <InputNumber min={50000} max={150000} value={priceVip} onInput={(e) => {
                    setPriceVip(e);
                }} />
            </div>
            <ButtonCommon text={"Add Showtime"} onClick={handleAddShowtime} />
        </AdminTemplate>
    );
};

export default CreateShowtime;