import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import "./NavTop.css";
import {useAppDispatch} from "../../../../hooks/redux-hooks";
import {getStories} from "../../../../store/slices/allStoriesSlice";

const NavTop:React.FC = () => {

    const dispatch = useAppDispatch();
    const handleUpdate = () => dispatch(getStories());

    return (
        <Navbar className={"NavTop"}>
            <h3>Все истории</h3>
            <Button onClick={handleUpdate} size={"sm"}>
                Обновить истории
            </Button>
        </Navbar>
    );
};

export default NavTop;
