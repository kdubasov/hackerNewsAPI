import React from 'react';
import {IComments} from "./IComments";
import CommentItem from "./components/CommentItem/CommentItem";
import "./Comments.css";

const Comments = ({comments, kids}:IComments) => {

    return (
        <div className={"Comments"}>
            <h5>Comments ({comments})</h5>

            {
                kids.map(comm => (
                    <CommentItem id={comm} key={comm} />
                ))
            }
        </div>
    );
};

export default Comments;
