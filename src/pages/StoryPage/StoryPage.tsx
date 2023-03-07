import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import {getStoryId} from "../../functions/getStoryId";

const StoryPage:React.FC = () => {

    const location = useLocation();
    const storyId = getStoryId(location.pathname);

    return (
        <Container className={"StoryPage py-3"}>
            <Link to={"/"}>
                <Button size={"sm"}>Back</Button>
            </Link>

            <h3>Story ({storyId}) page</h3>
        </Container>
    );
};

export default StoryPage;
