import { Router } from 'express';
import userController from '../controllers/user.js'
import postController from '../controllers/post.js'
import { authMiddleware, privateProfile } from '../lib/middleware.js';
import multer from 'multer'
import { nanoid } from 'nanoid';
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + nanoid() + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })




/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Creates a new user
 *     description: This endpoint allows you to create a new user.
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.post('/signup', userController.signupHandler)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User signin 
 *     description: This endpoint allows you to signin a new user.
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.post('/login', userController.loginHandler)
/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Retrieves a current authenticated user
 *     description: If there's no authenticated user error message is sent
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string, message?:string, user:IUser|null}</code>
 */
router.get('/verify',authMiddleware, userController.authHandler)

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Sign outs a user
 *     description: This endpoint allows you to signout a current user.
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, user:IUser|null}</code>
 *       
 */
router.post('/logout', authMiddleware, userController.logoutHandler)

/**
 * @swagger
 * /update/password:
 *   patch:
 *     summary: update password
 *     description: This endpoint allows you to update your current password.
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old:
 *                 type: string
 *               newpwd:
 *                 type: string
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.patch('/update/password', authMiddleware, userController.passwordUpdate)
/**
 * @swagger
 * /update/login:
 *   patch:
 *     summary: update login
 *     description: This endpoint allows you to update your current login.
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               login:
 *                 type: string
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.patch('/update/login', authMiddleware, userController.loginUpdate)

/**
 * @swagger
 * /profile/upload:
 *   patch:
 *     summary: uploads the profile picture
 *     description: This endpoint allows you to upload a new profile picture.
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               picture:
 *                 type: File
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:string}</code>
 *       
 */
router.patch('/profile/upload', authMiddleware, upload.single('picture'),  userController.profilePictureHandler)


/**
 * @swagger
 * /cover/upload:
 *   patch:
 *     summary: uploads a cover photos  
 *     description: This endpoint allows you to upload a new cover photo.
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cover:
 *                 type: File
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:string}</code>
 *       
 */
router.patch('/cover/upload', authMiddleware, upload.single('cover'),  userController.coverPictureHandler)
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: creates a new post
 *     description: 
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: File
 *               content:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:IPost}</code>
 *       
 */
router.post('/posts', authMiddleware, upload.single('photo'),  postController.addHandler)

/**
 * @swagger
 * /posts/react/:id:
 *   post:
 *     summary: like/unlike a post
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.post('/posts/react/:id', authMiddleware, privateProfile,  postController.reactPost)

/**
 * @swagger
 * /posts/comment/:id:
 *   post:
 *     summary: add comment to the post 
 *     description: 
 *     tags:
 *       - Resource
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:IComment}</code>
 *       
 */
router.post('/posts/comment/:id', authMiddleware, privateProfile,  postController.addComment)

/**
 * @swagger
 * /posts/comment/:id:
 *   delete:
 *     summary: deletes a comment from the spost
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.delete('/posts/comment/:id', authMiddleware,  postController.handleDeleteComment)

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieves all the posts of the current authenticated user
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string, payload:IPost[]}</code>
 */
router.get('/posts',authMiddleware, postController.getAll)
/**
 * @swagger
 * /posts/:id:
 *   get:
 *     summary: Retrieves a post by its id
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string, payload:IPost}</code>
 */
router.get('/posts/:id', authMiddleware, privateProfile, postController.getPost)
/**
 * @swagger
 * /posts/:id:
 *   delete:
 *     summary: removes the post
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string}</code>
 */
router.delete('/posts/:id', authMiddleware, postController.handleDelete)


/**
 * @swagger
 * /search/:text:
 *   get:
 *     summary: Retrieves all the users with the text as a start of their names
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string, payload:IUser[]}</code>
 */
router.get('/search/:text',authMiddleware, userController.searchUsers)
/**
 * @swagger
 * /account/set:
 *   patch:
 *     summary:  changes status of the current account from public to private and contrary
 *     description: This endpoint allows you to upload a new cover photo.
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:string}</code>
 *       
 */
router.patch('/account/set', authMiddleware,  userController.changeStatus)
/**
 * @swagger
 * /account/:id:
 *   get:
 *     summary: Retrieves account details for the given user
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string, payload:IUser|null}</code>
 */
router.get('/account/:id',authMiddleware, userController.getAccount)


/**
 * @swagger
 * /account/follow/:id:
 *   post:
 *     summary: start following to the given user
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:IUser}</code>
 *       
 */
router.post('/account/follow/:id', authMiddleware,  userController.follow)

/**
 * @swagger
 * /account/unfollow/:id:
 *   post:
 *     summary: start unfollowing to the given user
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:IUser}</code>
 *       
 */
router.post('/account/unfollow/:id', authMiddleware,  userController.unfollow)

/**
 * @swagger
 * /request/cancel/:id:
 *   delete:
 *     summary: cancels the request
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string, payload:IUser}</code>
 *       
 */
router.delete('/request/cancel/:id', authMiddleware,  userController.cancelRequest)

/**
 * @swagger
 * /requests/accept/:id:
 *   patch:
 *     summary: accepts the follow requests of a given user
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.patch('/requests/accept/:id', authMiddleware,  userController.accept)

/**
 * @swagger
 * /requests/decline/:id:
 *   patch:
 *     summary: declines the follow requests of a given user
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,message?:string}</code>
 *       
 */
router.patch('/requests/decline/:id', authMiddleware, userController.decline)


/**
 * @swagger
 * /requests:
 *   get:
 *     summary: gets all the requests
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,payload:IUser[]}</code>
 *       
 */
router.get('/requests', authMiddleware, userController.getRequests)

/**
 * @swagger
 * /followers:
 *   get:
 *     summary: gets all the followers
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,payload:IUser[]}</code>
 *       
 */
router.get('/followers', authMiddleware, userController.getFollowers)

/**
 * @swagger
 * /following:
 *   get:
 *     summary: gets the list of the users whom the authenticated one follows
 *     description: 
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: <code>{status:string,payload:IUser[]}</code>
 *       
 */
router.get('/following', authMiddleware, userController.getFollowings)









export default router;
