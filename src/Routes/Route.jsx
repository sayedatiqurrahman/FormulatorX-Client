import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/Home";
import CreateForm from "../components/pages/CreateForm";
import FormView from "../components/pages/FormView";
import Responses from "../components/pages/Responses";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import SingleResponse from "../components/pages/SingleRespone";
import Supports from "../components/pages/Supports";
import Forms from "../components/pages/Forms";
import Preview from "../components/pages/Preview";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'forms',
                element: <Forms />
            },

            {
                path: "/preview",
                element: <Preview />
            },
            {
                path: 'responses',
                element: <Responses />
            },
            {
                path: "create-form",
                element: <CreateForm />
            },
            {
                path: "formView/:id",
                element: <FormView />
            }, {
                path: 'responses/:id',
                element: <SingleResponse />
            },
            {
                path: "supports",
                element: <Supports />
            }

        ],
    },
    {
        path: "/login",
        element: <Login />
    }, {
        path: "/register",
        element: <Register />
    }
]);