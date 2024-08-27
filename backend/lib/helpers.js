import userModel from "../models/user.js";

Object.prototype.omit = function(...keys) {
    const newObj = { ...this };
    keys.forEach(key => {
        delete newObj[key];
    });
    return newObj;
};
export const loadUser = (item, key) => {
    if(key && key == 'follows'){
        return userModel.findOne({id:item.follows})?.omit('login', 'password')
    }
    if("userId" in item){
        return userModel.findOne({id:item.userId})?.omit('login', 'password')
    }
    return item
}