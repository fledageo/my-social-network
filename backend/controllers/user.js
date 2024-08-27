import { nanoid } from 'nanoid'
import userModel from '../models/user.js'
import sessionModel from '../models/session.js'
import bcrypt from 'bcrypt'
import postModel from '../models/post.js'
import followModel from '../models/follow.js'
import requestModel from '../models/request.js'
import { loadUser } from '../lib/helpers.js'
import likesModel from '../models/likes.js'


class UserController {
    async signupHandler(req, res) {
        try {
            const { name, surname, login, password } = req.body


            let error = ""
            const user = userModel.findWhere({ login })
            if (!name.trim() || !surname.trim() || !login.trim() || !password.trim()) {
                error = "Please fill all the fields"
            } else if (password.length < 6) {
                error = 'Please choose longer password'
            } else if (user.length) {
                error = 'Login is busy'
            }
            if (error) {
                return res.send({ status: 'error', message: error })

            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10)
                const result = userModel.insert(req.body)
                console.log(result)
                if (result.changes) {
                    return res.send({ status: 'ok' })
                }
            }
        }
        catch (err) {
            console.log(err.message)
            res.send({ status: 'error', message: "internal server error" })
        }
    }

    async loginHandler(req, res) {
        try {
            let { login, password } = req.body
            let found = null
            let error = ''
            if (!login.trim() || !password.trim()) {
                error = 'please fill all the fields'
            } else {
                found = userModel.findOne({ login })
                if (!found) {
                    error = 'Wrong user credentials: login'
                } else {
                    let result = await bcrypt.compare(password, found.password)
                    if (!result) {
                        error = 'Wrong user credentials: password'
                    }
                }
            }
            if (error) {
                res.send({ status: 'error', message: error })
            } else if (found) {
                let code = nanoid()

                sessionModel.delete({ userId: found.id })
                const result = sessionModel.insert({
                    id: code,
                    userId: found.id,
                    expires: Date.now() + (20 * 60 * 1000)
                })

                res.cookie('token', code, { maxAge: 900000, httpOnly: false });
                res.send({ status: 'ok' })
            }

            //RESPONSE
        } catch (err) {
            console.log(err.message)
            res.send({ status: 'error', message: 'internal server error' })
        }
    }

    async authHandler(req, res) {
        res.send({ status: 'ok', user: req.user })
    }

    async logoutHandler(req, res) {
        const token = req.cookies.token
        sessionModel.delete({ id: token })
        res.clearCookie('token')
        return res.send({ status: 'ok', user: null })
    }

    async passwordUpdate(req, res) {
        const { old, newpwd } = req.body
        const user = req.user
        let found = userModel.findOne({ id: user.id })
        let result = await bcrypt.compare(old, found.password)
        if (!result) {
            return res.send({ status: 'error', message: 'password is wrong' })
        } else {
            if (newpwd.length < 6) {
                return res.send({ status: 'error', message: 'password is too short' })
            }
            let hash = await bcrypt.hash(newpwd, 10)
            userModel.update({ id: user.id }, { password: hash })
            return res.send({ status: 'ok' })
        }

    }

    async loginUpdate(req, res) {
        const { login, password } = req.body
        const user = req.user
        let found = userModel.findOne({ id: user.id })
        let result = await bcrypt.compare(password, found.password)
        if (!result) {
            return res.send({ status: 'error', message: 'password is wrong' })
        } else {
            let exists = userModel.findOne({ login })
            if (exists) {
                return res.send({ status: 'error', message: 'login is already taken' })
            }

            userModel.update({ id: user.id }, { login })
            return res.send({ status: 'ok' })
        }
    }
    async profilePictureHandler(req, res) {
        const { filename } = req.file
        let source = '/images/' + filename
        const user = req.user.id
        userModel.update({ id: user }, { picture: source })

        res.send({ status: 'ok', message: 'picture uploaded successfully', payload: source })
    }

    async coverPictureHandler(req, res) {
        const { filename } = req.file
        let source = '/images/' + filename
        const user = req.user.id
        userModel.update({ id: user }, { cover: source })

        res.send({ status: 'ok', message: 'cover uploaded successfully', payload: source })
    }

    searchUsers(req, res) {
        const { text } = req.params
        let result = userModel.fullText(text).map(e => e.omit('login', 'password'))
        res.send({ status: 'ok', payload: result })
    }

    getAccount(req, res) {
        const { id } = req.params
        let result = userModel.findOne({ id })
        const user = req.user.id

        if (user == id) {
            return res.send({ status: 'error', message: 'you can not observe your own account' })
        }
        if (result) {
            const amIFollowing = followModel.findOne({ userId: user, follows: id })
            const followsMe = followModel.findOne({ userId: id, follows: user })
            const requested = requestModel.findOne({ userId: user, requests: id })
            result = result.omit('login', 'password')

            result.connection = {
                following: Boolean(amIFollowing),
                followsMe: Boolean(followsMe),
                requested: Boolean(requested)
            }

            if (!result.isPrivate || result.connection.following) {
               
               result.followers = followModel
                    .findWhere({ follows: result.id })
                    .map(e => e.userId)
                    .map(e => userModel.findOne({ id: e }).omit('login', 'password'))
                result.following = followModel
                    .findWhere({ userId: result.id })
                    .map(e => e.follows)
                    .map(e => userModel.findOne({ id: e }).omit('login', 'password'))


                result.posts = postModel.findWhere({ userId: id }).map(e => {
                    e.isLiked = Boolean(likesModel.findOne({userId:req.user.id, postId:e.id}))
                    return e
                })
            }
        }
        if (!result) {
            result = null
        }
        return res.send({ status: 'ok', payload: result })
    }
    changeStatus(req, res) {
        const user = req.user.id
        const status = userModel.findOne({ id: user }).isPrivate
        userModel.update({ id: user }, { isPrivate: 1 - status })
        return res.send({ status: 'ok', payload: 1 - status })

    }
    follow(req, res) {
        const { id } = req.params
        const user = req.user.id
        if (user == id) {
            return res.send({ status: 'error', message: 'you can not follow yourself' })
        }
        let found = followModel.findOne({ userId: user, follows: id })
        if (found) {
            return res.send({ status: 'error', message: 'already following' })
        }

        const them = userModel.findOne({ id })
        if (them.isPrivate) {
            requestModel.insert({ userId: user, requests: id })
            return res.send({ status: 'requested' })

        }

        followModel.insert({ userId: user, follows: id })
        return res.send({ status: 'following', payload: req.user.omit('login', 'password') })


    }
    unfollow(req, res) {
        const { id } = req.params
        const user = req.user.id
        if (user == id) {
            return res.send({ status: 'error', message: 'you can not unfollow yourself' })
        }
        let found = followModel.findOne({ userId: user, follows: id })
        if (!found) {
            return res.send({ status: 'error', message: 'you are not following this account' })
        }

        followModel.delete({ userId: user, follows: id })
        return res.send({ status: 'unfollowed', payload: req.user.omit('login', 'password') })

    }

    cancelRequest(req, res) {
        const { id } = req.params
        const me = req.user.id

        const found = requestModel.findOne({ userId: me, requests: id })
        if (!found) {
            return res.send({ status: 'error', message: 'no such request' })
        } else {
            requestModel.delete({ userId: me, requests: id })
            return res.send({ status: 'cancelled' })
        }
    }

    accept(req, res) {
        const { id } = req.params
        const user = req.user.id

        const found = requestModel.findOne({ id })
        if (!found) {
            return res.send({ status: 'error', message: 'no such request' })
        }

        if (found.requests != user) {
            return res.send({ status: 'error', message: 'you do not have a right to accept this request' })
        }

        followModel.insert({ userId: found.userId, follows: user })
        requestModel.delete({ id })
        return res.send({ status: 'ok', message: 'accepted' })
    }

    decline(req, res) {
        const { id } = req.params
        const user = req.user.id

        const found = requestModel.findOne({ id })
        if (!found) {
            return res.send({ status: 'error', message: 'no such request' })
        }

        if (found.requests != user) {
            return res.send({ status: 'error', message: 'you do not have a right to decline this request' })
        }

        requestModel.delete({ id })
        return res.send({ status: 'ok', message: 'declined' })
    }

    getRequests(req, res) {
        const id = req.user.id
        const all = requestModel
            .findWhere({ requests: id })
            .map(request => {
                return {
                    id: request.id,
                    user: userModel.findOne({ id: request.userId }).omit('login', 'password')
                }
            })

        return res.send({ status: 'ok', payload: all })
    }
    getFollowers(req, res) {
        const { id } = req.user
        const followers = followModel
            .findWhere({ follows: id })
            .map(loadUser)
        return res.send({ status: 'ok', payload: followers })
    }

    getFollowings(req, res) {
        const { id } = req.user
        const followers = followModel
            .findWhere({ userId: id })
            .map(x => loadUser(x, 'follows'))

        return res.send({ status: 'ok', payload: followers })
    }
}

export default new UserController()