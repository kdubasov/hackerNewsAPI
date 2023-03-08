import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {Alert, Button, Container, Spinner} from "react-bootstrap";
import {getStoryId} from "../../functions/getStoryId";
import FullLoader from "../../general-components/FullLoader/FullLoader";
import {getDate} from "../../functions/getDate";
import UserData from "./components/UserData/UserData";
import Comments from "./components/Comments/Comments";
import axios from "axios";
import {IStoryData} from "./IStoryPage";
import {getCutWord} from "../../functions/getCutWord";


//css
import "./StoryPage.css";
import "./StoryPageMedia.css";

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
            <div className={"StoryError"}>
                <Alert variant={"danger"} className={"p-2 small"}>
                    <h3 className={"m-0"}>Error get data!</h3>
                    {storyData.error} <br/>
                    <Link to={"/"}>
                        <Button variant={"danger"}>Go back</Button>
                    </Link>
                </Alert>
            </div>
        );
    }

    if (storyData.data){
        const { by,text,url,time,title,descendants,kids } = storyData.data;

        return (
            <Container className={"StoryPage"}>

                <p className="breadcrumbs">
                    <div>
                        <Link to={"/"}>Все истории</Link>
                        <span>/</span>
                        {getCutWord(title,15)}
                    </div>
                    <p className="date">
                        {getDate(time)}
                    </p>
                </p>

                <div className={"content"}>
                    <a className={"title"} target={"_blank"} rel={"noreferrer"} href={url}>
                        <h4 className={"title"}>{title}</h4>
                    </a>
                    <p className={"small"}>
                        {text || "Текст для данной статьи отсутствует"} <br/>
                        {!kids && "Комментарии не найдены"}
                    </p>
                </div>

                {/*user data*/}
                <UserData user={by} />

                <Button size={"sm"} onClick={() => handleUpdate()}>
                    {loader ? <Spinner as="span" size="sm"/> : "Обновить комментарии"}
                </Button>

                {/*commentaries*/}
                {kids && <Comments kids={kids} comments={descendants} />}

            </Container>
        );
    }
};

export default StoryPage;
