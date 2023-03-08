import React, {useEffect, useState} from 'react';
import FullLoader from "../../general-components/FullLoader/FullLoader";
import StoryCard from "./components/StoryCard/StoryCard";
import "./MainPage.css";
import {Alert, Button, Container} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import NavTop from "./components/NavTop/NavTop";
import {getStories} from "../../store/slices/allStoriesSlice";

const MainPage:React.FC = () => {

    //stories data
    const stories = useAppSelector(state => state.allStories);

    //show cards amount
    const [showAmount,setShowAmount] = useState(100);

    //get all stories
    const dispatch = useAppDispatch();
    useEffect(() => {
        //if !stories.length get info now
        if (!stories.stories.length){
            dispatch(getStories())
        }

        //update stories every 60 seconds
        const interval = setInterval(() => {
            dispatch(getStories())
            console.log("Comments was updated!")
        }, 1000 * 60);
        return () => clearInterval(interval);
    },[stories])

    //check data loading
    if (stories.loading){
        return <FullLoader />;
    }

    return (
        <Container className={"MainPage"}>
            <NavTop />

            {//check error
                stories.error &&
                <Alert variant={"danger"}>{stories.error}</Alert>
            }

            <div className="content">
                {
                    stories.stories
                        .slice(0,showAmount)
                        .map((story,index) => (
                            <StoryCard key={story} id={story} index={index + 1} />
                        ))
                }
            </div>

            <div className="d-flex justify-content-center">
                {
                    showAmount <= 400 &&
                    <Button size={"sm"} onClick={() => setShowAmount(showAmount + 100)}>
                        Показать больше историй
                    </Button>
                }
            </div>
        </Container>
    );
};

export default MainPage;
