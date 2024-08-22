import React from 'react'
import styles from "./Main.module.css"
import { Link } from 'react-router-dom'
export const Main = () => {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.actionsWrapper}>
                <Link to={"/signup"} className={styles.linkText}>Sign Up</Link>
            </div>
        </div>
    </>
  )
}
