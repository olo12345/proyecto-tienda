import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

const { Content } = Layout;

const UserLayout = () => {
    return (
        <Layout>
            <Navbar />
            <Content>
                <Outlet />
            </Content>
            <Footer /> 
        </Layout>
    )
}

export default UserLayout