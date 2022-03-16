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
                        router.push(routerString.MovieManagement);
                    }} key={routerString.MovieManagement} icon={<UserAddOutlined />}>
                        Movie Management
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        router.push(routerString.AddMovie);
                    }} key={routerString.AddMovie} icon={<UserAddOutlined />}>
                        Add movie
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        router.push(routerString.CreateShowtime);
                    }} key={routerString.CreateShowtime} icon={<UserAddOutlined />}>
                        Create Showtime
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        router.push(routerString.UserManagement);
                    }} key={routerString.UserManagement} icon={<UserAddOutlined />}>
                        User Management
                    </Menu.Item>
                    {/* <Menu.Item onClick={() => {
                        dispatch(actLogout());
                    }} key={"/"} icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item> */}
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', }}>
                    <div className="site-layout-background">
                        {children}
                    </div>
                </Content>

            </Layout>
        </Layout>
    </>);

};

export default AdminTemplate;