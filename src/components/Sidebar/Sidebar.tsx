import React, { useState } from 'react'
import styles from "./Sidebar.module.css"
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import { IoPerson } from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

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
                        <ListItemButton className={styles.listBtn}>
                            <ListItemIcon className={styles.iconWrapper}>
                                <IoPerson size={30} />
                            </ListItemIcon>
                            <ListItemText className={`${styles.textWrapper}`}>
                                <span className={`${styles.text}  ${isOpen ? styles.textOpen : ""}`}>Profile</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon className={styles.iconWrapper}>
                                <HiOutlinePhoto size={30} />
                            </ListItemIcon>
                            <ListItemText className={`${styles.textWrapper}`}>
                                <span className={`${styles.text}  ${isOpen ? styles.textOpen : ""}`}>Photos</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
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
