import React, { useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import AdminTemplate from '../../../components/AdminTemplate/AdminTemplate';
import { Pie } from '@ant-design/plots';
import ChartCircle from "../../../components/Dashboard/ChartCircle";
import axios from 'axios';

// const api

export default function Dashboard() {

    useEffect(() => {
        ; (async () => {

            const result = await axios.get("");

        })();
    }, []);


    return (
        <AdminTemplate>
            {/* <ChartCircle data={ } /> */}

        </AdminTemplate>
    );
}
