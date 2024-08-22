import { string } from "yup"

export interface ISignupFormData {
  name: string
  surname: string
  login: string
  password: string
  confirm?: string
}
export interface IUser {
  id?: number;
  name: string;
  surname: string;
  login: string;
  followers: IUser[];
  following: IUser[];
  password: string;
  picture?: string;
  cover?: string;
  isPrivate?: number;
}
export interface IAccount extends IUser {
  posts: IPost[]
  connection: { following: boolean, followsMe: boolean, requested: boolean }
}
export interface IGetRequestsResponse {
  id:string
  user:IUser
}

export interface IResponse {
  status: string;
  message?: string;
  user?: IUser;
  payload?: unknown;
}

export interface ILoginFormData {
  login: string
  password: string
}
export interface IContext {
  account: IUser;
  setAccount: (obj: IUser) => void;
}

export interface IPost {
  id: number;
  title: string;
  picture: string;
  likes: IUser[];
  isLiked: boolean
  userId:string
  comments:IComment[]
}


export interface IChangeLoginData{
  login:string
  password:string
  
}

export interface ICommentPayload{
  text:string
}
export interface IComment{
  content:string
  id:number|string
  user:IUser
}