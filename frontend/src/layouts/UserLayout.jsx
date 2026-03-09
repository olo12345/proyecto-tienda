import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

const { Content } = Layout;

const UserLayout = () => {
  return (
    /* Forzamos el alto de pantalla completa y el fondo espacial en el contenedor principal */
    <Layout style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
      <Navbar />
      {/* Hacemos transparente el contenido para que herede el fondo oscuro del Layout */}
      <Content style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default UserLayout