import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { routes } from './routes';

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
