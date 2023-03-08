import React, {useState} from 'react';
import {useApi} from "../../../../../../hooks/useApi";
import {getDate} from "../../../../../../functions/getDate";
import {Alert, Button} from "react-bootstrap";
import {getCutWord} from "../../../../../../functions/getCutWord";

//css
import "./CommentItem.css";
import "./CommentItemMedia.css";

//@ts-ignore
const CommentItem = ({id}:{id:number}): JSX.Element => {

    const commentData = useApi(`/item/${id}.json?print=pretty`);
    // console.log(commentData,"CommentItem")

    const [showKids, setShowKids] = useState(false);

    if (commentData.data){

        const { id, by, text, time, deleted, kids } = commentData.data;

        //check delete
        if (deleted){
            return (
                <Alert variant={"danger"} className={"p-2 small"}>
                    Comment <b>(#{id})</b> was Deleted!
                </Alert>
            )
        }

        return (
            <Alert variant={"secondary"} className={"CommentItem"}>
                <h6>By: {by}</h6>

                <p className={"small"}>
                    {getCutWord(text,100)}
                </p>

                <p className="small opacity-75 mb-2">
                    {getDate(time)}
                </p>

                {
                    kids &&
                    <Button variant={"secondary"} size={"sm"} onClick={() => setShowKids(!showKids)}>
                        {showKids ? "Скрыть дочерние комментарии" : "Показать дочерние комментарии"}
                    </Button>
                }

                {
                    showKids &&
                    <div className="kids">
                        {//@ts-ignore
                            kids.map(elem => (
                                <CommentItem id={elem} key={elem} />
                            ))
                        }
                    </div>
                }
            </Alert>
        );
    }
};

export default CommentItem;
