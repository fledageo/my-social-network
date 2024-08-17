import { ILoginFormData, IResponse, ISignupFormData } from "./types";
import axios from "axios";
const Axios = axios.create({
    baseURL:"http://localhost:4002",
    withCredentials:true
})


export const addNewUser = async (data:ISignupFormData):Promise<IResponse> => {
    const response = await Axios.post("/signup",data)
    return response.data
}
export const loginUser = async (data:ILoginFormData):Promise<IResponse> => {
    const response = await Axios.post("/login",data)
    return response.data
}

export const verifyUser = async ():Promise<IResponse> => {
    const response = await Axios.get("/verify")
    return response.data
}

export const logoutUser  = async():Promise<IResponse> => {
    const response = await Axios.post('/logout')
    return response.data
}
export const handleUpload = async (form: FormData):Promise<IResponse> => {
    const response = await Axios.patch('/profile/upload', form);
    return response.data;
};

export const getAllPosts = async () => {
    const response = await Axios.get('/posts')
    return response.data
}

export const handlePostUpload = async (form: FormData): Promise<IResponse> => {
    const response = await Axios.post('/posts', form);
    return response.data;
};