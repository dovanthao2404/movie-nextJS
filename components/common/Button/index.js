import { Button } from 'antd';
import React from 'react';

export const ButtonCommon = ({ text, onClick, bgColor, borderColor, color }) => {
    return (
        <Button onClick={onClick} type="primary"
            style={
                bgColor && borderColor && color ?
                    {
                        background: bgColor,
                        borderColor: borderColor,
                        color: color
                    } : {

                    }}
        >{text}</Button>

    );
};
