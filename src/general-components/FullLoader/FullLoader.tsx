import React from 'react';
import {Spinner} from "react-bootstrap";
import "./FullLoader.css";

const FullLoader:React.FC = () => {
    return (
        <div className={"FullLoader"}>
            <Spinner />
        </div>
    );
};

export default FullLoader;
