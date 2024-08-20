import React, { useEffect, useState } from 'react'
import styles from "./Notifli.module.css"
import { useOutletContext } from 'react-router-dom';
import { IContext, IGetRequestsResponse, IUser } from '../../../helpers/types';
import { acceptRequest, declineRequest, getAllRequests } from '../../../helpers/api';
import { Box, Avatar, Button } from '@mui/material';
import { BASE, INIT_PROFILE_IMG } from '../../../helpers/default';
import { IoMdCheckmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export const Notifli = () => {
    const { account, setAccount } = useOutletContext<IContext>();
    const [requests, setRequests] = useState<IGetRequestsResponse[]>([]);
    const [isAccept,setIsAccept] = useState<boolean>(false);


    useEffect(() => {
        if (account.id) {
            getAllRequests(account.id)
                .then(res => {
                    if (res.status != "error") {
                        setRequests(res.payload as IGetRequestsResponse[])
                    }
                })
        }


    }, [isAccept])



    console.log(requests)
    const handleAccept = (id: string) => {
        acceptRequest(id)
            .then(res => {
                const idIndex = requests.findIndex(elm => elm.id == id)
                let temp = requests.splice(idIndex, 1)
                setRequests(temp)
                setIsAccept(!isAccept)
            })
    }
    const handleDecline = (id: string) => {
        declineRequest(id)
            .then(res => {
                const idIndex = requests.findIndex(elm => elm.id == id)
                let temp = requests.splice(idIndex, 1)
                setRequests(temp)
                setIsAccept(!isAccept)
            })
    }

    console.log(requests)

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {
                        requests.map(request => <Box key={request.user.id} className={styles.requestBox}>
                            <div className={styles.infoWrapper}>
                                <Avatar src={BASE + request.user.picture} sx={{ marginRight: "10px" }} />
                                <span>{request.user.name} {request.user.surname}</span>
                            </div>
                            <div className={styles.actionsBlock}>
                                <button className={styles.actionBtn} onClick={() => handleAccept(request.id)}>
                                    <IoMdCheckmark color='green' size={20} />
                                </button>
                                <button className={styles.actionBtn} onClick={() => handleDecline(request.id)}>
                                    <IoClose color='red' size={23} />
                                </button>
                            </div>
                        </Box>)
                    }
                </div>
            </div>
        </>
    )
}
