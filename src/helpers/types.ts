import { string } from "yup"

export interface ISignupFormData{
    name:string
    surname:string
    login:string
    password:string
    confirm?:string
}
export interface IUser {
    id?: number;
    name: string;
    surname: string;
    login: string;
    password: string;
    picture?: string;
    cover?: string;
    followers?: IUser[];
    following?: IUser[];
    isPrivate?: number;
  }

  export interface IResponse {
    status: string;
    message?: string;
    user?: IUser;
    payload?: unknown;
  }

export interface ILoginFormData {
    login:string
    password:string
}
export interface IContext {
    account: IUser;
    setAccount: (obj: IUser) => void;
  }