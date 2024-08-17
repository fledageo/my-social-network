import React, { useState } from 'react';
import styles from "./Feed.module.css";
import { RiImageAddFill } from "react-icons/ri";
import { MdOutlineNoteAdd } from "react-icons/md";
import { MdAddReaction } from "react-icons/md";
import { Modal, Box, Typography } from '@mui/material';
import { AddPostModal } from '../addPostModal/AddPostModal';

export const Feed = () => {
  const [addPostModal, setAddPostModal] = useState<boolean>(false);

  const togglePostModal = (state: boolean) => {
    setAddPostModal(state);
  };

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

      <Modal
        open={addPostModal}
        onClose={() => togglePostModal(false)}
      >
        <Box className={styles.addPostModal}>
            <AddPostModal />
        </Box>
      </Modal>
    </>
  );
};