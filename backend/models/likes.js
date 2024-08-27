import { Base } from "./base.js";
import userModel from "./user.js";

class Likes extends Base{
    table="likes"

    findWhere(conditionals) {
        return super
            .findWhere(conditionals)
            .map(likes => {
                let user = userModel.findOne({ id: likes.userId })?.omit('login', 'password')
                return user
            })
    }

    
}

export default new Likes()