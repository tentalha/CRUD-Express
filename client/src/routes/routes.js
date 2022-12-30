import { useRoutes } from 'react-router-dom';
import Landing from '../Pages/Landing';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

const Routes = () => {
    let element = useRoutes([
        {
            path: "/home",
            element: <Landing />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
    ]);
    return element;
}

export default Routes