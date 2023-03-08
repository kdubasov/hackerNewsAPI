import React from 'react';
import {IStoryCard} from "./IStoryCard";
import {useApi} from "../../../../hooks/useApi";
import {getDate} from "../../../../functions/getDate";
import {getCutWord} from "../../../../functions/getCutWord";
import {Link} from "react-router-dom";

//css
import "./StoryCard.css";
import "./StoryCardMedia.css";

// @ts-ignore
const StoryCard = ({id, index}:IStoryCard): JSX.Element => {

    //data for one story
    const story = useApi(`/item/${id}.json?print=pretty`);

    if (story.data){
        // @ts-ignore
        const { by,text,time,title,score } = story.data;

        return (
            <Link className={"StoryCard card"} to={`/story/${id}`}>
                <h4 className="card__title">
                    {index}. {getCutWord(title,20)}
                </h4>

                <p className="card__content">
                    <b>Текст:</b> {getCutWord(text,50) || "Без описания!"} <br/>
                    <b>Создатель:</b> {by} <br/>
                    <b>Рейтинг:</b> {score} <br/>
                </p>

                <div className="card__date">
                    {getDate(time)}
                </div>

                <div className="card__arrow">
                    <img src="/images/arrow-right.svg" alt=""/>
                </div>
            </Link>
        );
    }
};

export default StoryCard;
