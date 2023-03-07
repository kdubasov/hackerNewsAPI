import React, {useState} from 'react';
import FullLoader from "../../general-components/FullLoader/FullLoader";
import StoryCard from "./components/StoryCard/StoryCard";
import "./MainPage.css";
import {Alert, Container} from "react-bootstrap";
import {useAppSelector} from "../../hooks/redux-hooks";
import NavTop from "./components/NavTop/NavTop";

const MainPage:React.FC = () => {

    const stories = useAppSelector(state => state.allStories);
    const [showAmount] = useState(20);

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
                        .map(story => (
                            <StoryCard key={story} id={story} />
                        ))
                }
            </div>
        </Container>
    );
};

export default MainPage;
