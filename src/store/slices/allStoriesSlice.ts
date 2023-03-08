import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface IStories {
    stories: number[],
    loading: Boolean,
    error: null | string,
}

const initialState:IStories = {
    stories: [],
    loading: false,
    error: null,
}

export const getStories = createAsyncThunk<any, undefined, {rejectValue: string}>(
    'allStories/getStories',
    async (_,{rejectWithValue}) => {
        const url = "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";

        const res = await axios.get(url);
        if (res.status !== 200){
            return rejectWithValue("Get stories failed!")
        }
        return res.data
    }
)

export const allStoriesSlice = createSlice({
    name: "allStories",
    initialState,
    reducers: {
        setStories: (state,action) => {
            state.stories = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getStories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStories.fulfilled, (state, action) => {
                state.stories = action.payload;
                state.loading = false;
            })
            .addCase(getStories.rejected, (state) => {
                state.loading = false;
                state.error = "Get stories failed!"
            })
    }
})



// export const {setStories} = allStoriesSlice.actions;
export default allStoriesSlice.reducer;