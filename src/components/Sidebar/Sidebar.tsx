import React, { useEffect, useState } from 'react'
import styles from "./Sidebar.module.css"
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import { IoPerson } from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoNotificationsSharp } from "react-icons/io5";
import { IUser } from '../../helpers/types';


interface IProps{
    account:IUser
}

export const Sidebar = ({account}:IProps) => {

    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const navigate = useNavigate()
    const toggleSidebar = (state: boolean) => {
        setIsOpen(state)
    }

    


    return (
        <div
            className={`${styles.sideBar} ${isOpen ? styles.sidebarOpen : ""}`}
            onMouseOver={() => toggleSidebar(true)}
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
                        <ListItemButton onClick={() => navigate("/profile/notiflications")}>
                            <ListItemIcon className={styles.iconWrapper}>
                                <IoNotificationsSharp size={30}/>
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
                </List>
            </nav>

        </div>
    )
}
