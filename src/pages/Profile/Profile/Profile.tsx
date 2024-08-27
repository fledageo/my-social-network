import React, { useEffect, useRef, useState } from 'react'
import styles from "./Profile.module.css"
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IContext, IPost } from '../../../helpers/types';
import { getAllPosts, handleUpload, uploadCover } from '../../../helpers/api';
import { Box, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { MdFileUpload } from "react-icons/md";
import { TbPhotoSearch } from "react-icons/tb";
import { Feed } from '../../../components/complex/UserPostsFeed/Feed';
import { BASE, INIT_PROFILE_IMG } from '../../../helpers/default';
import { MiniPhotoList } from '../../../components/simple/MiniPhotoList/MiniPhotoList';
import { SearchBlock } from '../../../components/complex/SearchBlock/SearchBlock';
import { FollowersModal } from '../../../components/complex/FollowersModal/FollowersModal';
import { FollowingModal } from '../../../components/complex/FollowingModal/FollowingModal';

export const Profile = () => {
    const [imgDropdown, setImgDropdown] = useState<Boolean>(false)
    const [posts, setPosts] = useState<IPost[]>([]);

    const [followersModal,setFollowersModal] = useState<boolean>(false)
    const [followingModal,setFollowingModal] = useState<boolean>(false)
    const coverRef = useRef<HTMLInputElement | null>(null)

    const navigate = useNavigate()
    const { account, setAccount } = useOutletContext<IContext>();
    const photo = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        getAllPosts().then((response) => {
            setPosts(response.payload as IPost[]);
        });
    }, []);

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

    const toggleFollowersModal = (state:boolean) => {
        setFollowersModal(state)
    }
    
    const toggleFollowingModal = (state:boolean) => {
        setFollowingModal(state)
    }

    const handleSelectCover = () => {
        if(coverRef.current){
            coverRef.current.click()
        }
    }
    const handleCoverUpload = () => {
        const file = coverRef.current?.files?.[0];
        if (file) {
            const form = new FormData();
            form.append("cover", file);
            uploadCover(form).then((response) => {
                setAccount({ ...account, cover: response.payload as string });
                console.log(response)
            });
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.coverSection} onClick={handleSelectCover} style={account.cover ? {background:`url('${BASE + account.cover}')`} : {background:"#7FA1C3"}}>
                    <input type="file" hidden ref={coverRef} onChange={handleCoverUpload}/>
                </div>
                <div className={styles.mainSection}>
                    <div className={styles.block1}>
                        <div className={styles.imgBlock} onClick={() => toggleDropDown(true)} onMouseLeave={() => toggleDropDown(false)}>
                            <div className={styles.imgWrapper}>
                                <img
                                    src={`${account.picture ? BASE + account.picture : INIT_PROFILE_IMG}`}
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
                                <div className={styles.followers} onClick={() => toggleFollowersModal(true)}>
                                    <span className={styles.followText}>followers</span>
                                    <span className={styles.followCount}>{account.followers.length}</span>
                                </div>
                                <div className={styles.following} onClick={() => toggleFollowingModal(true)}>
                                    <span className={styles.followText}>following</span>
                                    <span className={styles.followCount}>{account.following.length}</span>
                                </div>
                            </div>
                        </div>

                        {
                            posts.length !== 0 ? 
                            <div className={styles.miniPhotoList} onClick={() => navigate("/profile/photos")}>
                                <span className={styles.photosText}>Photos</span>
                                <MiniPhotoList posts={posts} />
                            </div> : ""
                        }


                    </div>
                    <div className={styles.block2}>
                        <Feed account={account} />
                    </div>
                    <div className={styles.block3}>
                        <div className={styles.block3Container}>
                            <div className={styles.block3Wrapper}>
                                <SearchBlock/>
                            </div>
                        </div>
                    </div>

                    
                    <FollowersModal isOpen={followersModal} closeModal={toggleFollowersModal} followers={account.followers}/>
                    <FollowingModal isOpen={followingModal} closeModal={toggleFollowingModal} followings={account.following}/>
                </div>
            </div>
        </>
    )
}
