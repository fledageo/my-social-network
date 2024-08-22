import React, { useEffect, useRef, useState } from 'react'
import styles from "./ZoomPost.module.css"
import { Modal, Box, TextField, Button, InputAdornment } from '@mui/material'
import { IAccount, IPost, IUser, IContext, IComment } from '../../../helpers/types'
import { BASE } from '../../../helpers/default'
import { UserInfo } from '../../simple/UserInfo/UserInfo'
import { addComment, getAccount, getPostById, postReaction } from '../../../helpers/api'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { useOutletContext } from 'react-router-dom'
import { ShowComment } from '../../simple/ShowComment/ShowComment'
import { FaRegCommentAlt } from "react-icons/fa";



useOutletContext
interface IProps {
  isOpen: boolean
  postId: number
  closeModal: (state: boolean) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};


export const ZoomPost = ({ isOpen, postId, closeModal }: IProps) => {
  const [user, setUser] = useState<IAccount | null>(null)
  const { account } = useOutletContext<IContext>()
  const [post, setPost] = useState<IPost | null>(null)
  const [comment, setComment] = useState<string>("")

  const commentFieldRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    getPostById(postId)
      .then(res => {
        let post = res.payload as IPost
        setPost(post)
        getAccount(post.userId)
          .then((res) => {
            setUser(res.payload as IAccount)
          })
      })
  }, [])

  console.log(post)
  const handleReaction = () => {
    postReaction(postId)
      .then(() => {
        if (post) {
          if (post.isLiked) {
            let removedLike = post.likes.filter(a => a.id !== account.id)
            setPost({
              ...post,
              isLiked: false,
              likes: [...removedLike]
            })
          } else {
            let addLike = [...post.likes]
            addLike.push(account)
            setPost({
              ...post,
              isLiked: true,
              likes: [...addLike]
            })
          }
        }
      })
  }

  const handleAddComment = () => {
    addComment({ text: comment }, post?.id as number)
      .then((res) => {
        if (post) {
          let temp = [...post?.comments] as IComment[]
          temp.push(res.payload as IComment)
          setPost({
            ...post,
            comments: [...temp]
          })
          setComment("")
        }
      })
  }

  const onCommentFieldFocus = () => {
    if(commentFieldRef.current){
        commentFieldRef.current.focus()
    }
  }


  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => closeModal(false)}
        className={styles.container}
      >
        <Box sx={style} className={styles.modalBox}>
          <div className={styles.wrapper}>
            <div className={styles.postBlock}>
              <div className={styles.userInfo}>
                {
                  user && <UserInfo account={user as IUser} />
                }
              </div>
              <div className={styles.imgWrapper}>
                <img src={BASE + post?.picture} className={styles.ZoomImg} />
              </div>
              <div className={styles.showInfo}>
                <span className={styles.infoText} style={{ marginRight: "10px" }}>{post?.likes.length} Likes</span>
                <span className={styles.infoText}>{post?.comments.length} Comments</span>
              </div>
            </div>



            <div className={styles.actionsBlock}>
              <div className={styles.commentsPart}>

                {
                  post?.comments.map(comment => <ShowComment key={comment.id} comment={comment} />)
                }


              </div>
              <div className={styles.actionsPart}>
                <div className={styles.btns}>
                  <button className={styles.iconBtn}>
                    {
                      post?.isLiked ? <IoIosHeart size={30} onClick={handleReaction} color='red' /> : <IoIosHeartEmpty size={30} onClick={handleReaction} />
                    }
                  </button>
                  <button className={styles.iconBtn}  style={{marginLeft:"10px"}}>

                    <FaRegCommentAlt size={25} onClick={onCommentFieldFocus}/>

                  </button>
                </div>
                <div className={styles.fieldWrapper}>
                  <TextField
                    fullWidth
                    ref={commentFieldRef}
                    label="Comment"
                    multiline
                    maxRows={3}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    sx={{ marginTop: "10px", height: "100%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IoMdSend size={25} className={styles.sendBtn} onClick={handleAddComment} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

