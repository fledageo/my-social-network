import React, { useEffect, useState } from 'react';
import styles from "./Feed.module.css";
import { RiImageAddFill } from "react-icons/ri";
import { MdOutlineNoteAdd } from "react-icons/md";
import { MdAddReaction } from "react-icons/md";
import { AddPostModal } from '../addPostModal/AddPostModal';
import { IPost, IUser } from '../../../helpers/types';
import { handlePostUpload, getAllPosts } from '../../../helpers/api'
import { Button, Divider } from '@mui/material';
import { BASE, INIT_PROFILE_IMG } from '../../../helpers/default'
import { ShowPost } from '../../simple/ShowPost/ShowPost';


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
          setUserPosts([response.payload as IPost,...userPosts])
        }
      })
  }
  const togglePostModal = (state: boolean) => {
    setNewPostModal(state);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.actionsBlock}>
            <div className={styles.watsNewBlock}>
              <div className={styles.userImgBlock}>
                <img
                  src={`${account.picture ? BASE + account.picture : INIT_PROFILE_IMG}`}
                  alt="profile image"
                  className={styles.userImg}
                />
              </div>
              <Button variant="outlined" 
                      className={styles.newPostBtn} 
                      sx={{ borderRadius: '30px' }}
                      onClick={() => togglePostModal(true)}
                      >What's new?</Button>
            </div>
            <Divider />
            <div className={styles.buttonsBlock}>
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
      </div>

      <div className={styles.showPostsBlock}>
        {userPosts.map(post => <ShowPost key={post.id} post={post} account={account} />)}
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