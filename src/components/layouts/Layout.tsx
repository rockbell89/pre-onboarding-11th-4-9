import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <main>
      <Header />
      <article>
        <Outlet />
      </article>
      <Footer />
    </main>
  );
};

export default Layout;
