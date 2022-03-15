import React from 'react';
import { Pie } from '@ant-design/plots';

const ChartCircle = ({ data }) => {

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: (data) => {
                return `${(data.percent * 100).toFixed(0)}%`;
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    return (
        <Pie {...config} />

    );
};

export default ChartCircle;