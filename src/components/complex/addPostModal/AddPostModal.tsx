import React, { useRef, useState } from 'react'
import styles from "./AddPostModal.module.css"
import { Divider, TextField, Button } from '@mui/material'
import { IUser } from '../../../helpers/types'
import { BASE,INIT_PROFILE_IMG } from '../../../helpers/default'
import { RiImageAddFill } from "react-icons/ri";
import { Modal, Box } from '@mui/material';
import { UserInfo } from '../../simple/UserInfo/UserInfo'
interface IProps {
    account: IUser
    newPostModal: boolean
    togglePostModal: (state: boolean) => void
    handleAddNewPost: (form: FormData) => void
}


export const AddPostModal = ({ account, newPostModal, togglePostModal, handleAddNewPost }: IProps) => {
    const [text, setText] = useState<string>("")
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const inputFile = useRef<HTMLInputElement | null>(null)

    const handleAddPost = () => {
        const file = inputFile.current?.files?.[0]
        if (file) {
            const form = new FormData()
            form.append('photo', file)
            form.append('content', text)

            handleAddNewPost(form)
        }
    }
    const imageUpload = () => {
        inputFile.current?.click()
    }
    const handleFileOnChange = async () => {
        const file = inputFile.current?.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageSrc(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <>
            <Modal
                open={newPostModal}
                onClose={() => togglePostModal(false)}
            >
                <Box className={styles.addPostModal}>
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            <div className={styles.addNewPostWrapper}>
                                <span className={styles.addNewPost}>Add New Post</span>
                            </div>
                            <Divider />
                            <div className={styles.newPostBlockWrapper}>
                                <div className={styles.newPostBlock}>

                                    <div className={styles.userInfoWrapper}>
                                        <UserInfo account={account} />
                                    </div>

                                    <div className={styles.actionBlock}>
                                        <TextField
                                            multiline
                                            placeholder="What's new?"
                                            fullWidth
                                            maxRows={20}
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        border: 'none',
                                                    },
                                                },
                                            }}
                                        />
                                        <div className={styles.imgUploadBlock} onClick={imageUpload}>
                                            {
                                                imageSrc ? <img src={imageSrc} alt="selected image" className={styles.selectedImg} /> : <div className={styles.imgUploadText}>
                                                    <RiImageAddFill size={40} />
                                                    <span>Add photos</span>
                                                </div>
                                            }
                                            <input type="file" className={styles.fileInput} ref={inputFile} onChange={handleFileOnChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.footer}>
                                    <Button variant="outlined" className={styles.addBtn} onClick={handleAddPost}>Add</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

        </>
    )
}
