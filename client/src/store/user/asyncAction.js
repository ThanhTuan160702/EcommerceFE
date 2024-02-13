import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getUser = createAsyncThunk('user/current', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetUser()
    if(!response.success){
        return rejectWithValue(response)
    }
    return response.rs
})