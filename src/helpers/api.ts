import { IChangeLoginData, ILoginFormData, IResponse, ISignupFormData } from "./types";
import axios from "axios";
const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})


export const addNewUser = async (data: ISignupFormData): Promise<IResponse> => {
    const response = await Axios.post("/signup", data)
    return response.data
}
export const loginUser = async (data: ILoginFormData): Promise<IResponse> => {
    const response = await Axios.post("/login", data)
    return response.data
}

export const verifyUser = async (): Promise<IResponse> => {
    const response = await Axios.get("/verify")
    return response.data
}

export const logoutUser = async (): Promise<IResponse> => {
    const response = await Axios.post('/logout')
    return response.data
}
export const handleUpload = async (form: FormData): Promise<IResponse> => {
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

export const handlePrivacyStatus = async (): Promise<IResponse> => {
    const response = await Axios.patch('/account/set');
    return response.data;
}
export const handleChangePassword = async (form: FormData): Promise<IResponse> => {
    const response = await Axios.post('/update/password', form);
    return response.data;
}

export const handleChangeLogin = async (payload: IChangeLoginData): Promise<IResponse> => {
    const response = await Axios.patch('/update/login', payload);
    return response.data;
};


export const searchUsers = async (text: string): Promise<IResponse> => {
    const response = await Axios.get("/search/" + text)
    return response.data
}

export const getAccount = async (id: string): Promise<IResponse> => {
    const response = await Axios.get("/account/" + id)
    return response.data
}



export const follow = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/account/follow/' + id)
    return response.data
}

export const unfollow = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/account/unfollow/' + id)
    return response.data
}

export const cancelRequest = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete('/request/cancel/' + id)
    return response.data
}


export const getAllFollowers = async (id: string): Promise<IResponse> => {
    const response = await Axios.get('/followers')
    return response.data
}

export const getAllRequests = async (id: number): Promise<IResponse> => {
    const response = await Axios.get('/requests')
    return response.data
}

export const acceptRequest = async(id:string) => {
    const response = await Axios.patch('/requests/accept/' + id)
    return response.data
}
export const declineRequest = async(id:string) => {
    const response = await Axios.patch('/requests/decline/' + id)
    return response.data
}