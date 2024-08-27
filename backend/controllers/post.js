import postModel from '../models/post.js'
import likesModel from '../models/likes.js'
import userModel from '../models/user.js'
import commentModel from '../models/comments.js'
class PostController {

    addHandler(req, res) {
        const { filename } = req.file
        let source = '/images/' + filename
        const user = req.user.id

        const post = {
            title: req.body.content,
            userId: user,
            picture: source
        }
        const row = postModel.insert(post)

        res.send({ status: 'ok', message: 'cover uploaded successfully', payload: { ...post, id: row.lastInsertRowid, likes:[] } })
    }

    getAll(req, res) {
        const user = req.user.id
        const posts = postModel
            .findWhere({ userId: user })

        return res.send({ status: 'ok', payload: posts })
    }

    handleDelete(req, res) {
        const id = req.params.id
        const user = req.user.id
        const post = postModel.findOne({ id })
        if (!post) {
            return res.send({ status: 'error', message: 'no such post' })
        }
        if (post.userId != user) {
            return res.send({ status: 'error', message: 'you do not have rights to delete this post' })
        }

        postModel.delete({ id })
        return res.send({ status: 'ok', payload: id })
    }

    reactPost(req, res) {
        const { id } = req.params
        const me = req.user.id

        const descriptor = { postId: id, userId: me }
        let found = likesModel.findOne(descriptor)
        if (!found) {
            likesModel.insert(descriptor)
            return res.send({ status: 'ok', payload: 'liked' })
        } else {
            likesModel.delete(descriptor)
            return res.send({ status: 'ok', payload: 'unliked' })
        }
    }
    addComment(req, res) {
        const { id } = req.params
        const me = req.user.id
        const { text } = req.body
        const comment = { content: text, userId: me, postId: id }
        const result = commentModel.insert(comment)
        comment.user = userModel.findOne({id:comment.userId})

        return res.send({ status: 'ok', payload: { ...comment, id: result.lastInsertRowid } })

    }

    handleDeleteComment(req, res) {
        const { id } = req.params
        const user = req.user.id
        const comment = commentModel.findOne({ id })
        if (comment && comment.user?.id == user) {
            commentModel.delete({ id })
            return res.send({ status: 'ok' })
        } else {
            res.send({ status: 'error', message: 'you do not have access' })
        }
    }
    getPost(req, res) {
        const { id } = req.params
        const post = postModel.findOne({ id })
        
        return res.send({ status: 'ok', payload: post })

    }
}

export default new PostController()