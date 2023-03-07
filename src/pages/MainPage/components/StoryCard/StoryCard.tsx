import React from 'react';
import "./StoryCard.css";
import {IStoryCard} from "./IStoryCard";
import {useApi} from "../../../../hooks/useApi";
import {getDate} from "../../../../functions/getDate";
import {getCutWord} from "../../../../functions/getCutWord";
import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";

// @ts-ignore
const StoryCard = ({id}:IStoryCard): JSX.Element => {

    //data for one story
    const story = useApi(`/item/${id}.json?print=pretty`);

    if (story.data){
        // @ts-ignore
        const { by,text,time,title,score } = story.data;

        return (
            <Link className={"StoryCard"} to={`/story/${id}`}>
                <h5 className={"m-0 fw-bolder"}>
                    {getCutWord(title,20)}
                </h5>

                <small className={"my-1"}>
                    <Badge>Текст:</Badge> {getCutWord(text,50) || "Без описания!"} <br/>
                    <Badge>Создатель:</Badge> {by} <br/>
                    <Badge>Рейтинг:</Badge> {score} <br/>
                </small>

                <small className="opacity-50">
                    {getDate(time)}
                </small>
            </Link>
        );
    }
};

export default StoryCard;
