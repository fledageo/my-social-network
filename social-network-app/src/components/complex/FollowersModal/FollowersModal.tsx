import React from 'react'
import styles from "./FollowersModal.module.css"
import { Modal, Box, Avatar, Divider } from '@mui/material'
import { IUser } from '../../../helpers/types';
import { BASE } from '../../../helpers/default'
import { BsPersonUp } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface IProps {
    isOpen: boolean
    closeModal: (state: boolean) => void
    followers: IUser[]
}

export const FollowersModal = ({ isOpen, closeModal, followers }: IProps) => {

    const navigate = useNavigate()


    return (
        <>
            <Modal
                open={isOpen}
                onClose={() => closeModal(false)}
            >
                <Box sx={styles} className={styles.modalBox}>
                    <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <span className={styles.title}>Followers</span>
                        </div>
                        <Divider sx={{ margin: "20px 0" }} />
                        {
                            followers.map(user => <Box key={user.id} className={styles.userInfo}>
                                <div className={styles.infoWrapper}>
                                    <Avatar src={BASE + user.picture} sx={{ marginRight: "10px" }} />
                                    <span>{user.name} {user.surname}</span>
                                </div>
                                <div className={styles.actionsWrapper} onClick={() => navigate(`/profile/${user.id}`)}>
                                    <div className={styles.icon}>
                                    <BsPersonUp size={25}/>
                                    </div>
                                </div>
                            </Box>)
                        }
                    </div>
                </Box>
            </Modal>
        </>
    )
}