import sessionModel from '../models/session.js'
import userModel from '../models/user.js'
import followModel from '../models/follow.js'
import postModel from '../models/post.js'
export function authMiddleware(req, res, next) {
    const token = req.cookies.token
    const badResponse = { status: 'error', message: 'please login in order to continue', user:null }
    if (!token) {
        return res.send(badResponse)
    }
    let found = sessionModel.findOne({ id: token })
    if (!found) {
        return res.send(badResponse)
    }
    let now = Date.now()
    let diff = (now - found.expires) / 1000
    if (diff > 20 * 60 * 1000) {
        return res.send({ ...badResponse, message: 'session expired' })
    }
    
    sessionModel.update({userId:found.userId}, {expires:Date.now() + 20 * 60 * 1000})
    const user = userModel.findOne({ id: found.userId })
    if (!user) {
        return res.send(badResponse)
    }

    req.user = user.omit('login', 'password')
    
    req.user.followers = followModel
                    .findWhere({follows:req.user.id})
                    .map(e => e.userId)
                    .map(e => userModel.findOne({id:e}).omit('login','password'))
    req.user.following = followModel
                    .findWhere({userId:req.user.id})
                    .map(e => e.follows)
                    .map(e => userModel.findOne({id:e}).omit('login','password'))

    return next()
}

export function privateProfile(req, res, next){
    const {id} = req.params
    let post = postModel.findOne({id})
    if(!post){
        return res.send({status:'error', message:'no such post'})
    }
    let whom = userModel.findOne({id:post.userId})
    if(whom.isPrivate && whom.id != req.user.id){
        let following = followModel.findOne({userId:req.user.id, follows:whom.id})
        if(!following){
            return res.send({status:'error', message:'you do not have a right to react this post'})
        }
    }

    return next()
}