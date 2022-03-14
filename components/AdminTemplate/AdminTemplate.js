import { Layout, Menu } from 'antd';
import styles from "./admin-template.module.scss";
import {
    UserOutlined,
    LogoutOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { routerString } from '../../routers/routerString';
import { useRouter } from 'next/router';

const { Content, Sider } = Layout;
const AdminTemplate = ({ children }) => {

    const router = useRouter();

    console.log(router);
    return (<>
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
                    <Menu.Item onClick={() => {
                        router.push(routerString.Dashboard);
                    }} key={routerString.Dashboard} icon={<UserOutlined />}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        router.push(routerString.ListUser);
                    }} key={routerString.ListUser} icon={<UserAddOutlined />}>
                        List User
                    </Menu.Item>
                    {/* <Menu.Item onClick={() => {
                        dispatch(actLogout());
                    }} key={"/"} icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item> */}
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background">
                        {children}
                    </div>
                </Content>

            </Layout>
        </Layout>
    </>);

};

export default AdminTemplate;