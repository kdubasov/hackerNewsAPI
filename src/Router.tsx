import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StoryPage from "./pages/StoryPage/StoryPage";
import {getStories} from "./store/slices/allStoriesSlice";
import {useAppDispatch} from "./hooks/redux-hooks";

const Router:React.FC = () => {

    //get all stories
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getStories())
    },[])

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
