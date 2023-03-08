import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StoryPage from "./pages/StoryPage/StoryPage";

const Router:React.FC = () => {

    //router data
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage />,
        },
        {
            path: "/story/:storyId",
            element: <StoryPage />,
        },
    ]);

    return (
        <div className={"Router"}>
            <RouterProvider router={router} />
        </div>
    );
};

export default Router;
