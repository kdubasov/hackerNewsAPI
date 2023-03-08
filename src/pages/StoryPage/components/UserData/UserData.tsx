import React from 'react';
import {useApi} from "../../../../hooks/useApi";
import FullLoader from "../../../../general-components/FullLoader/FullLoader";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";

interface IUserData {
    user: string | null,
}

const UserData = ({user}:IUserData): JSX.Element => {

    const userData = useApi(`/user/${user}.json?print=pretty`);
    console.log(userData,"UserData")

    //check loading data
    if (!userData.data && !userData.error){
        return <FullLoader />;
    }

    // if error
    if (userData.error){
        return (
            <Alert variant={"danger"}>
                <h3>Error get data!</h3>
                {userData.error} <br/>
                <Link to={"/"}>Go back</Link>
            </Alert>
        );
    }

    return (
        <div className={"UserData"}>

        </div>
    );
};

export default UserData;
