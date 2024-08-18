import React from 'react'
import styles from "./UserInfo.module.css"
import { IUser } from '../../helpers/types'
import { BASE, INIT_PROFILE_IMG } from '../../helpers/default'

interface IProps{
    account:IUser
}

export const UserInfo = ({account}:IProps) => {
  return (
    <>
        <div className={styles.userInfoBlock}>
            <div className={styles.userImgBlock}>
              <img
                src={`${account.picture ? BASE + account.picture : INIT_PROFILE_IMG}`}
                alt="profile image"
                className={styles.userImg}
              />
            </div>
            <div className={styles.nameBlock}>
              <span>{account.name} {account.surname}</span>
            </div>
          </div>
    </>
  )
}
