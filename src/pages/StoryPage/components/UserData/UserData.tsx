import React from 'react';
import {useApi} from "../../../../hooks/useApi";
import {Alert} from "react-bootstrap";
import {getDate} from "../../../../functions/getDate";
import {IUserData} from "./IUserData";

//css
import "./UserData.css";
import "./UserDataMedia.css";

//@ts-ignore
const UserData = ({user}:IUserData): JSX.Element => {

    const userData = useApi(`/user/${user}.json?print=pretty`);
    // console.log(userData,"UserData");

    // if error
    if (userData.error){
        return (
            <Alert className={"text-center"} variant={"danger"}>
                <h5 className={"m-0 fw-bolder"}>Error get user data!</h5>
                {userData.error}
            </Alert>
        );
    }

    if (userData.data){

        const { id, created, karma } = userData.data;

        return (
            <Alert className={"UserData"}>
                <h5 className={"fw-bolder"}>
                    Информация о пользователе
                </h5>
                <p className={"m-0 small"}>
                    Никнейм: <b>{id}</b> <br/>
                    Аккаунт создан: <b>{getDate(created)}</b> <br/>
                    Карма: <b>{karma}</b>
                </p>
            </Alert>
        );
    }
};

export default UserData;
