import React, { useEffect, useState } from 'react'
import styles from "./UserAccount.module.css"
import { useNavigate, useParams } from 'react-router-dom'
import { IAccount, IPost, IUser } from '../../../helpers/types'
import { cancelRequest, follow, getAccount, getAllFollowers, unfollow } from '../../../helpers/api'
import { BASE, INIT_PROFILE_IMG } from '../../../helpers/default'
import { BsPersonFillAdd } from "react-icons/bs";
import { TbMessageForward } from "react-icons/tb";
import { BsPersonFillUp } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";

import { Button } from '@mui/material'


export const UserAccount = () => {
    const [userAccount, setUserAccount] = useState<IAccount | null>(null)
    const navigate = useNavigate()
    const { id } = useParams()
    



    useEffect(() => {
        if (id) {
            getAccount(id)
                .then(res => {
                    if (res.status == "error" || !res.payload) {
                        navigate("/profile")
                    } else {
                        setUserAccount(res.payload as IAccount)
                    }
                })
        }
    }, [id])



    const followUser = () => {
        if (userAccount?.id) {
            follow(userAccount?.id)
                .then(res => {
                    if (res.status == 'following') {
                        setUserAccount({
                            ...userAccount,
                            followers: [...userAccount.followers, res.payload as IUser],
                            connection: { ...userAccount.connection, following: true }
                        })
                    } else if (res.status == 'requested') {
                        setUserAccount({
                            ...userAccount,
                            connection: { ...userAccount.connection, requested: true }
                        })
                    }
                })
        }
    }
    const unfollowUser = () => {
        if (userAccount?.id) {
            unfollow(userAccount?.id)
                .then(res => {

                    if (res.status == "unfollowed") {
                        let unfollower = res.payload as IUser
                        let findIndex = userAccount.followers.findIndex(user => user.id == unfollower.id)
                        let temp = [...userAccount.followers]
                        temp.splice(findIndex, 1)
                        setUserAccount({
                            ...userAccount,
                            followers: [...temp],
                            connection: { ...userAccount.connection, following: false }
                        })
                    }
                })
        }
    }
    const cancelFollowRequest = () => {
        if (userAccount?.id) {
            cancelRequest(userAccount.id)
                .then(response => {
                    if (response.status == 'cancelled') {
                        setUserAccount({
                            ...userAccount,
                            connection: { ...userAccount.connection, requested: false }
                        })
                    }
                })
        }
    }


    const handleSetConnection = () => {
        if (userAccount && userAccount.id) {
            if (userAccount.connection.following) {
                unfollowUser()
            } else if (userAccount.connection.requested) {
                cancelFollowRequest()
            } else {
                followUser()
            }

        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.coverSection}>

                </div>
                <div className={styles.mainSection}>
                    <div className={styles.userInfoWrapper}>
                        <div className={styles.imgBlock}>
                            <div className={styles.imgWrapper}>
                                <img
                                    src={`${userAccount?.picture ? BASE + userAccount?.picture : INIT_PROFILE_IMG}`}
                                    alt="User Photo"
                                    className={styles.mainImg}
                                />
                            </div>
                        </div>
                        <div className={styles.infoBlock}>
                            <div className={styles.nameBlock}>
                                <span>{userAccount?.name} {userAccount?.surname}</span>
                            </div>
                            <div className={styles.followFollowing}>
                                <div className={styles.followers}>
                                    <span className={styles.followText}>followers</span>
                                    <span className={styles.followCount}>{userAccount?.followers ? userAccount.followers.length : 0}</span>
                                </div>
                                <div className={styles.following}>
                                    <span className={styles.followText}>following</span>
                                    <span className={styles.followCount}>{userAccount?.following ? userAccount.following.length : 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.actionBlock}>
                        <div className={styles.actionsWrapper}>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={
                                    userAccount?.connection.requested ? <BsPersonFillUp size={20} /> :
                                        userAccount?.connection.following ? <BsPersonFillCheck size={20} /> :
                                            <BsPersonFillAdd size={20} />

                                }
                                sx={{ marginRight: "50px" }}
                                onClick={handleSetConnection}
                            >
                                {
                                    userAccount?.connection.following ?
                                        "unfollow" :
                                        userAccount?.connection.requested ?
                                            "requested" :
                                            userAccount?.connection.followsMe ?
                                                "follow back" : "follow"
                                }
                            </Button>
                            <Button size="small" variant="outlined" startIcon={<TbMessageForward />}>
                                Message
                            </Button>
                        </div>
                    </div>
                    <div className={styles.showBlock}>

                    </div>
                </div>
            </div>
        </>
    )
}
