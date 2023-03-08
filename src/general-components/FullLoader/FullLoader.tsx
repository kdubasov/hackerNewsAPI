import React from 'react';
import "./FullLoader.css";

const FullLoader:React.FC = () => {
    return (
        <div className={"FullLoader"}>
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    );
};

export default FullLoader;
