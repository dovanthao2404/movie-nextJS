import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Menu, Dropdown, Button, } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


const DropdownCustom = ({ data, onClick, label, defaultText }) => {
    const [value, setValue] = useState();

    const handleMenuClick = (e) => {
        e.key = JSON.parse(e.key);
        setValue(e.key);
        onClick(e);
    };



    const menu = (
        <Menu className='movie' onClick={handleMenuClick}>

            {data?.map((item, key) => {
                return <Menu.Item key={JSON.stringify({ id: item.id, name: item.name, time: Date.now() })} icon={<UserOutlined />}>
                    {item.name}
                </Menu.Item>;
            })}

        </Menu>
    );

    useEffect(() => {
        if (data?.length > 0) {
            setValue(undefined);

        } else {
            setValue(undefined);
        }
    }, [data]);




    return (
        <div>
            {label && <Box sx={{ mr: 1, minWidth: "100px", display: "inline-block" }} component="label">{label}</Box>}
            <Dropdown overlay={menu}>
                <Button>
                    {value?.name || defaultText || "Button"} <DownOutlined />
                </Button>
            </Dropdown>

        </div>
    );
};

export default DropdownCustom;