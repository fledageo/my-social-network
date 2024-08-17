import React from 'react'
import styles from "./AddPostModal.module.css"
import { Divider } from '@mui/material'

export const AddPostModal = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.addNewPostWrapper}>
                        <span className={styles.addNewPost}>Add New Post</span>
                    </div>
                    <Divider />
                    <div className={styles.userInfoBlock}>
                        <div className={styles.imgBlock}>
                            <img src="" alt="" />
                        </div>
                        <div className={styles.nameBlock}>
                            <span>David</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
