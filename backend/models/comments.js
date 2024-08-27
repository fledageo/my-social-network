import { Base } from "./base.js";
import userModel from './user.js'
class Comments extends Base{
    table="comments"

    findWhere(conditionals){
        return super
               .findWhere(conditionals)
               .map(comment => {
                comment.user = userModel.findOne({id:comment.userId})?.omit('login', 'password','isPrivate','cover')
                delete comment.userId
                delete comment.postId
                return comment
               })
    }
}

export default new Comments()