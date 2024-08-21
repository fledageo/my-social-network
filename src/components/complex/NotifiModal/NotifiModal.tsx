import React, { useEffect, useState } from 'react'
import styles from "./NotifiModal.module.css"
import { IGetRequestsResponse, IUser } from '../../../helpers/types';
import { acceptRequest, declineRequest, getAllRequests } from "../../../helpers/api";
import { Avatar, Box, Modal, Divider } from '@mui/material';
import { BASE} from '../../../helpers/default'
import { IoMdCheckmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps {
    notifiBar: boolean
    setnotifiBar: React.Dispatch<React.SetStateAction<boolean>>
    account: IUser
}

export const NotificationBar = ({ notifiBar, setnotifiBar, account }: IProps) => {
    const [allRequests, setAllRequests] = useState<IGetRequestsResponse[]>([]);
    const [isAccept, setIsAccept] = useState<boolean>(false);

    useEffect(() => {
        if (account.id) {
            getAllRequests(account.id)
                .then(res => {
                    if (res.payload) {
                        setAllRequests(res.payload as IGetRequestsResponse[])
                    }
                })
        }
    }, [])

    const toggleAction = (state: boolean) => setnotifiBar(state);

    const handleAccept = (id: string) => {
        acceptRequest(id)
            .then(() => {
                const idIndex = allRequests.findIndex(elm => elm.id == id)
                let temp = allRequests
                temp.splice(idIndex, 1)
                setAllRequests(temp)
                setIsAccept(!isAccept)
            })
    }
    const handleDecline = (id: string) => {
        declineRequest(id)
            .then(() => {
                const idIndex = allRequests.findIndex(elm => elm.id == id)
                let temp = allRequests
                temp.splice(idIndex, 1)
                setAllRequests(temp)
                setIsAccept(!isAccept)
            })
    }


    return (
        <>
            <Modal
                open={notifiBar}
                onClose={() => toggleAction(false)}
            >
                <Box sx={styles} className={styles.modalBox}>
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            <div className={styles.header}>
                                <span className={styles.title}>Notification</span>
                            </div>
                                <Divider sx={{ margin: "20px 0" }} />
                            {
                                allRequests.map(request => <Box key={request.user.id} className={styles.requestBox}>
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
                </Box>
            </Modal>
        </>
    )
}
