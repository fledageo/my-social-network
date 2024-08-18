import React from 'react'
import { IPost, IUser } from '../../helpers/types'
import { BASE, INIT_PROFILE_IMG } from '../../helpers/default'
import styles from "./ShowPost.module.css"
import { Box } from '@mui/material'
import { UserInfo } from '../UserInfo/UserInfo'
interface IProps{
    post:IPost
    account:IUser
}

export const ShowPost = ({post,account}:IProps) => {
  return (
    <>
        <Box key={post.id} className={styles.postBlock}>
          <UserInfo account={account}/>
          <div className={styles.postContent}>
            <div className={styles.contentText}>
                <span>{post.title}</span>
            </div>
            <div className={styles.contentImage}>
              { 
                post.picture && <img src={BASE + post.picture} alt="post picture" className={styles.contentImg}/>
              }
            </div>
          </div>
        </Box>
    </>
  )
}
