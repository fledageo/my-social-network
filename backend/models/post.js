import { Base } from "./base.js";
import commentsModel from "./comments.js";
import likesModel from "./likes.js";

class Post extends Base {
    table = "posts"

    findWhere(conditionals) {
        return   super
                .findWhere(conditionals)
                .map(post => {
                    post.likes = likesModel.findWhere({ postId: post.id })
                    post.comments = commentsModel.findWhere({ postId: post.id })

                    return post
                })
    }
}

export default new Post()