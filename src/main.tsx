import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from "./Router";

//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

//my css
import "./styles/index.css";

//redux
import {Provider} from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <Router />
        </React.StrictMode>
    </Provider>,
)
