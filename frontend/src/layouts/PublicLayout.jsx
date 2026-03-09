import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

const { Content } = Layout;

const PublicLayout = () => {
    return (
        /* Mismo tratamiento: alto completo y fondo oscuro */
        <Layout style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
            <Navbar />
            {/* Contenido transparente para no romper la inmersión */}
            <Content style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column" }}>
                <Outlet />
            </Content>
            <Footer /> 
        </Layout>
    )
}

export default PublicLayout;