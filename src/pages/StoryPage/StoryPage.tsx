import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {Alert, Button, Container, Spinner} from "react-bootstrap";
import {getStoryId} from "../../functions/getStoryId";
import FullLoader from "../../general-components/FullLoader/FullLoader";
import "./StoryPage.css";
import {getDate} from "../../functions/getDate";
import UserData from "./components/UserData/UserData";
import Comments from "./components/Comments/Comments";
import axios from "axios";
import {IStoryData} from "./IStoryPage";

const StoryPage = () => {

    //data from location about story id
    const location = useLocation();
    const storyId = getStoryId(location.pathname);
    const [loader, setLoader] = useState(false);

    //data for one story
    const [storyData, setStoryData] = useState<IStoryData>({error:null, data:null});
    // console.log(storyData,"storyData in StoryPage");

    //get story data form api
    const getData = async () => {
        const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;
        const res = await axios.get(url);
        if (res.status !== 200){
            setStoryData({error: "Error get data about Story!", data: null})
        }
        setStoryData({error: null, data: res.data})
    }

    //Story data update
    const handleUpdate = () => {
        setLoader(true);
        getData().then(() => {
            setLoader(false);
            alert("Story data was updated!")
        })
    }

    //set data in state
    useEffect(() => {
        if (!storyData.data){
            getData().then(() => console.log("Story was show!"))
        }
    },[])

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
        const { by,text,url,time,title,descendants,kids } = storyData.data;

        return (
            <Container className={"StoryPage"}>

                <div className={"content"}>
                    <Link to={"/"}>
                        <Button size={"sm"}>Go back</Button>
                    </Link>

                    <a target={"_blank"} rel={"noreferrer"} href={url}>
                        <h3>{title}</h3>
                    </a>
                    <p>
                        {text || "Text not found"} <br/>
                        {!kids && "Comments not found"}
                    </p>
                    <p className="opacity-75">
                        {getDate(time)}
                    </p>

                    <Button size={"sm"} onClick={() => handleUpdate()}>
                        {loader ? <Spinner as="span" size="sm"/> : "Update comments"}
                    </Button>
                </div>

                {/*user data*/}
                <UserData user={by} />

                {/*commentaries*/}
                {kids && <Comments kids={kids} comments={descendants} />}

            </Container>
        );
    }
};

export default StoryPage;
