import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from './../components/Navbar';

const { Content, Footer } = Layout;

const UserLayout = () => {
    return (
        <Layout>
            <Navbar />
            <Content>
                <Outlet />
            </Content>
            <Footer> Public Layout </Footer>
        </Layout>
    )
}

export default UserLayout