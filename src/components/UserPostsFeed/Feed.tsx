import React, { useEffect, useState } from 'react';
import styles from "./Feed.module.css";
import { RiImageAddFill } from "react-icons/ri";
import { MdOutlineNoteAdd } from "react-icons/md";
import { MdAddReaction } from "react-icons/md";
import { Modal, Box } from '@mui/material';
import { AddPostModal } from '../addPostModal/AddPostModal';
import { IPost, IUser } from '../../helpers/types';
import { handlePostUpload, getAllPosts } from '../../helpers/api'
import { BASE, INIT_PROFILE_IMG } from '../../helpers/default'

interface IProps {
  account: IUser
}

export const Feed = ({ account }: IProps) => {
  const [newPostModal, setNewPostModal] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<IPost[]>([])

  useEffect(() => {
    getAllPosts()
      .then(response => {
        setUserPosts(response.payload as IPost[])
      })

  }, [])

  const handleAddNewPost = (form: FormData) => {
    setNewPostModal(false)
    handlePostUpload(form)
      .then(response => {
        if (response.status !== "error") {
          setUserPosts([...userPosts, response.payload as IPost])
        }
      })
  }
  const togglePostModal = (state: boolean) => {
    setNewPostModal(state);
  };
  console.log(userPosts)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.actionsBlock}>
            <div className={styles.action} onClick={() => togglePostModal(true)}>
              <RiImageAddFill size={30} color='#2E3C4F' />
            </div>
            <div className={styles.action}>
              <MdOutlineNoteAdd size={30} color='#2E3C4F' />
            </div>
            <div className={styles.action}>
              <MdAddReaction size={30} color='#2E3C4F' />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.showPostsBlock}>
        {userPosts.map(post => <Box key={post.id} className={styles.postBlock}>
          <div className={styles.userInfoBlock}>
            <div className={styles.userImgBlock}>
              <img
                src={`${account.picture ? BASE + account.picture : INIT_PROFILE_IMG}`}
                alt="profile image"
                className={styles.userImg}
              />
            </div>
            <div className={styles.nameBlock}>
              <span>{account.name} {account.surname}</span>
            </div>
          </div>
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
        </Box>)}
      </div>



      {newPostModal &&
        <AddPostModal
          account={account}
          newPostModal={newPostModal}
          togglePostModal={togglePostModal}
          handleAddNewPost={handleAddNewPost}
        />
      }


    </>
  );
};