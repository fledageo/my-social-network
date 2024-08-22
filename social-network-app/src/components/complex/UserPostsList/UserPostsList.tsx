import React, { useState } from 'react'
import styles from "./UserPostsList.module.css"
import { IPost } from '../../../helpers/types'
import { BASE } from '../../../helpers/default'
import { ZoomPost } from '../ZoomPost/ZoomPost'
interface IProps {
    posts: IPost[]
}
interface IPostModalState{
    state:boolean
    postId:number | null
}
export const UserPostsList = ({ posts }: IProps) => {
    const [isPostOpen, setIsPostOpen] = useState<IPostModalState>({state:false,postId:null})

    const handleCloseZoom = () => {
        setIsPostOpen({state:false,postId:null})
    }
 
    return (
        <>
            <div className={styles.UserPostsList}>
                {
                    <div className={styles.wrapper}>
                        {
                            posts.map(post => <div key={post.id} className={styles.postBlock} onClick={() => setIsPostOpen({state:true,postId:post.id})}>
                                <img src={BASE + post.picture} className={styles.postImg} />
                            </div>)
                        }
                    </div>
                }

                {
                    isPostOpen.state ? <ZoomPost isOpen={isPostOpen.state} closeModal={handleCloseZoom} postId={isPostOpen.postId as number} /> : ""
                }

            </div>
        </>
    )
}
