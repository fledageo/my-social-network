import React from 'react'
import styles from "./MiniPhotoList.module.css"
import { IPost } from '../../../helpers/types'
import { BASE } from '../../../helpers/default'
import { Box } from '@mui/material'
interface IProps{
    posts:IPost[]
}

export const MiniPhotoList = ({posts}:IProps) => {
    return (
        <>
            <Box className={styles.showBlock}>
                {
                    posts.map(post => <Box key={post.id} className={styles.imgBlock}>
                        <img src={`${BASE + post.picture}`} className={styles.postImg}/>
                    </Box>)
                }    
            </Box>
        </>
    )
}
