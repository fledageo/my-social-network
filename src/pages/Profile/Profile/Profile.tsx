import React, { useEffect, useRef, useState } from 'react'
import styles from "./Profile.module.css"
import { useOutletContext } from 'react-router-dom';
import { IContext } from '../../../helpers/types';
import { getAllPosts, handleUpload } from '../../../helpers/api';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { MdFileUpload } from "react-icons/md";
import { TbPhotoSearch } from "react-icons/tb";
import { Feed } from '../../../components/UserPostsFeed/Feed';



export const Profile = () => {
    const [imgDropdown, setImgDropdown] = useState<Boolean>(false)
    const [gallery,setGallery] = useState()

    const { account, setAccount } = useOutletContext<IContext>();
    const photo = useRef<HTMLInputElement | null>(null);
    const BASE = 'http://localhost:4002';

    const photoUpload = () => {
        const file = photo.current?.files?.[0];
        if (file) {
            const form = new FormData();
            form.append("picture", file);
            handleUpload(form).then((response) => {
                setAccount({ ...account, picture: response.payload as string });
            });
        }
    };
    const activeFileInput = () => {
        photo.current?.click()
    }

    const toggleDropDown = (state: Boolean) => {
        setImgDropdown(state)
    }
    
    useEffect(() => {
        getAllPosts()
        .then(res => {
            console.log(res.payload)
        })
    },[])

    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.coverSection}>
                
                </div>
                <div className={styles.mainSection}>
                    <div className={styles.block1}>
                        <div className={styles.imgBlock} onClick={() => toggleDropDown(true)} onMouseLeave={() => toggleDropDown(false)}>
                            <div className={styles.imgWrapper}>
                                <img
                                    src={`${account.picture ? BASE + account.picture : "../public/init-profile-img.jpeg"}`}
                                    alt="Profile Image"
                                    className={styles.mainImg} 
                                />

                                <Box className={`${styles.imgDropMenu} ${imgDropdown ? styles.imgDropdownOpen : ""}`}>
                                    <List>
                                        <ListItem>
                                            <ListItemButton style={{ justifyContent: "center" }} onClick={activeFileInput}>
                                                <ListItemIcon className={styles.dropIcon}>
                                                    <MdFileUpload size={30} color='whiteSmoke' />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton style={{ justifyContent: "center" }}>
                                                <ListItemIcon className={styles.dropIcon}>
                                                    <TbPhotoSearch size={25} color='whiteSmoke' />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Box>

                                <input type="file" ref={photo} onChange={photoUpload} style={{ display: "none" }} />
                            </div>
                        </div>
                        <div className={styles.infoBlock}>
                            <div className={styles.nameBlock}>
                                <span>{account.name} {account.surname}</span>
                            </div>
                            <div className={styles.followFollowing}>
                                <div className={styles.followers}>
                                    <span className={styles.followText}>followers</span>
                                    <span className={styles.followCount}>340</span>
                                </div>
                                <div className={styles.following}>
                                    <span className={styles.followText}>following</span>
                                    <span className={styles.followCount}>340</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.miniGallery}>

                        </div>


                    </div>
                    <div className={styles.block2}>
                        <Feed/>
                    </div>  
                    <div className={styles.block3}>

                    </div>
                </div>
            </div>
        </>
    )
}
