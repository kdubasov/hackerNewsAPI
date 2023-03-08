import React, {useState} from 'react';
import {useApi} from "../../../../../../hooks/useApi";
import "./CommentItem.css";
import {getDate} from "../../../../../../functions/getDate";
import {Alert, Button} from "react-bootstrap";

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
            <div className={"CommentItem"}>
                <b>By: {by}</b>
                <p>Text: {text}</p>
                <p className="opacity-75">
                    {getDate(time)}
                </p>

                {
                    kids &&
                    <Button size={"sm"} onClick={() => setShowKids(!showKids)}>
                        {showKids ? "Hide kids comments" : "Show kids comments"}
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
            </div>
        );
    }
};

export default CommentItem;
