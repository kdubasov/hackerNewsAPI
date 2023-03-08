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
            <h4>Список новостей</h4>
            <Button onClick={handleUpdate} size={"sm"}>
                Обновить истории
            </Button>
        </Navbar>
    );
};

export default NavTop;
