import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

const { Content } = Layout;

// Corregido el nombre de la constante para que coincida con el export
const AdminLayout = () => {
    return (
        /* Forzamos el alto completo y el fondo espacial del Layout */
        <Layout style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
            <Navbar />
            {/* Hacemos el contenido transparente y flexible */}
            <Content style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column" }}>
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    )
}

export default AdminLayout;