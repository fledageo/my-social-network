import React from 'react'
import styles from "./ShowComment.module.css"
import { Avatar } from '@mui/material'
import { IComment } from '../../../helpers/types'
import { BASE } from '../../../helpers/default'
interface IProps{
    comment:IComment
}
export const ShowComment = ({comment}:IProps) => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <Avatar src={BASE + comment.user.picture} sx={{marginRight:"10px"}}/>
                <span>{comment.user.name} {comment.user.surname}</span>
            </div>
            <div className={styles.commentText}>
              <p className={styles.text}>{comment.content}</p>
            </div>
        </div>
    </div>
  )
}
