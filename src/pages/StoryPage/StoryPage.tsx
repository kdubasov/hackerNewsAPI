import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Alert, Button, Container} from "react-bootstrap";
import {getStoryId} from "../../functions/getStoryId";
import {useApi} from "../../hooks/useApi";
import FullLoader from "../../general-components/FullLoader/FullLoader";
import "./StoryPage.css";
import {getDate} from "../../functions/getDate";
import UserData from "./components/UserData/UserData";

const StoryPage = () => {

    const location = useLocation();
    const storyId = getStoryId(location.pathname);
    //data for one story
    const storyData = useApi(`/item/${storyId}.json?print=pretty`);
    console.log(storyData,"storyData in StoryPage");

    //check loading data
    if (!storyData.data && !storyData.error){
        return <FullLoader />;
    }

    // if error
    if (storyData.error){
        return (
            <Alert variant={"danger"}>
                <h3>Error get data!</h3>
                {storyData.error} <br/>
                <Link to={"/"}>Go back</Link>
            </Alert>
        );
    }

    if (storyData.data){

        const { by,text,url,time,title,descendants } = storyData.data;

        return (
            <Container className={"StoryPage"}>
                <Link to={"/"}>
                    <Button size={"sm"}>Go back</Button>
                </Link>

                <a target={"_blank"} rel={"noreferrer"} href={url}>
                    <h3>{title}</h3>
                </a>
                <p>{text || "Text not found"}</p>
                <p className="opacity-75">
                    {getDate(time)}
                </p>
                <p>Comments: {descendants}</p>

                <UserData user={by} />
            </Container>
        );
    }
};

export default StoryPage;
