import {configureStore} from "@reduxjs/toolkit";
import allStoriesSlice from "./slices/allStoriesSlice";

const store = configureStore({
    reducer : {
        allStories: allStoriesSlice,
    },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;