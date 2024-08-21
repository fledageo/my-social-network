import React, { useEffect, useRef, useState } from 'react'
import styles from "./Sidebar.module.css"
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Badge } from '@mui/material'
import { IoPerson } from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoNotificationsSharp } from "react-icons/io5";
import { IUser } from '../../../helpers/types';
import { NotificationBar } from '../NotifiModal/NotifiModal';
import { MdLogout } from "react-icons/md";
import { logoutUser } from '../../../helpers/api';

interface IProps {
    account: IUser
}

export const Sidebar = ({ account }: IProps) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [notifiBar, setnotifiBar] = useState<boolean>(false)
    const navigate = useNavigate()
    const toggleSidebar = (state: boolean) => {
        setIsOpen(state)
    }

    const handleLogout = () => {
        logoutUser()
        .then(() => navigate("/login"))
    }
    return (
        <div
            className={`${styles.sideBar} ${isOpen ? styles.sidebarOpen : ""}`}
            onMouseOver={() => {
                if(!notifiBar){
                    toggleSidebar(true)
                }else{
                    toggleSidebar(false)
                }
            }}
            onMouseLeave={() => toggleSidebar(false)}
        >

            <nav>
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => navigate("/profile")}>
                            <ListItemIcon className={styles.iconWrapper}>
                                <IoPerson size={30} />
                            </ListItemIcon>
                            <ListItemText className={`${styles.textWrapper}`}>
                                <span className={`${styles.text}  ${isOpen ? styles.textOpen : ""}`}>Profile</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => setnotifiBar(true)}>
                            <ListItemIcon className={styles.iconWrapper}>
                                <Badge badgeContent={0} color="primary">
                                    <IoNotificationsSharp size={30}/>
                                </Badge>
                            </ListItemIcon>
                            <ListItemText className={`${styles.textWrapper}`}>
                                <span className={`${styles.text}  ${isOpen ? styles.textOpen : ""}`}>Notification</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate("/profile/photos")}>
                            <ListItemIcon className={styles.iconWrapper}>
                                <HiOutlinePhoto size={30} />
                            </ListItemIcon>
                            <ListItemText className={`${styles.textWrapper}`}>
                                <span className={`${styles.text}  ${isOpen ? styles.textOpen : ""}`}>Photos</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate("/profile/settings")}>
                            <ListItemIcon className={styles.iconWrapper}>
                                <IoSettingsOutline size={30} />
                            </ListItemIcon>
                            <ListItemText className={`${styles.textWrapper}`}>
                                <span className={`${styles.text}  ${isOpen ? styles.textOpen : ""}`}>Settings</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon className={styles.iconWrapper}>
                                <MdLogout size={30} />
                            </ListItemIcon>
                            <ListItemText className={`${styles.textWrapper}`}>
                                <span className={`${styles.text}  ${isOpen ? styles.textOpen : ""}`}>Log out</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>

            </nav>
            {
                notifiBar ? <NotificationBar notifiBar={notifiBar} setnotifiBar={setnotifiBar} account={account}/> : ""
            }
        </div>
    )
}
