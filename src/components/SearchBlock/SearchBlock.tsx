import { TextField, InputAdornment,Avatar } from "@mui/material"
import { IoIosSearch } from "react-icons/io";
import styles from "./SearchBlock.module.css"
import { useEffect, useRef, useState } from "react";
import { IUser } from "../../helpers/types";
import { searchUsers } from "../../helpers/api";
import { BASE,INIT_PROFILE_IMG } from "../../helpers/default";
import { useNavigate } from "react-router-dom";


export const SearchBlock = () => {
    const [searchTxt,setSearchTxt] = useState<string>("")
    const [findUsers,setFindUsers] = useState<IUser[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if(!searchTxt.trim()){
            setFindUsers([])
        }else{
            searchUsers(searchTxt)
            .then(res => {
                setFindUsers(res.payload as IUser[])
            })
        }
    },[searchTxt])

    

    return (
        <>
            <div className={styles.container}>
                <TextField
                    id="standard-basic"
                    label="Search for friend..."
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IoIosSearch size={20}/>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setSearchTxt(e.target.value)}
                />
                
                
             
                <div className={styles.showFindBlock}>
                    {
                        findUsers.map(user => <div key={user.id} className={styles.showUserBlock} onClick={() => navigate(`/profile/${user.id}`)}>
                            <Avatar src={user.picture ? BASE + user.picture : INIT_PROFILE_IMG} sx={{marginRight:"10px"}}/>
                            <span>{user.name} {user.surname}</span>
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}
