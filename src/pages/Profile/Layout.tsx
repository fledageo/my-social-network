import React, { useEffect, useState } from 'react';
import styles from "./Layout.module.css"
import { Sidebar } from '../../components/complex/Sidebar/Sidebar';
import { useNavigate,Outlet } from 'react-router-dom';
import { logoutUser, verifyUser } from '../../helpers/api';
import { IUser } from '../../helpers/types';

export const Layout = () => {
    const [account, setAccount] = useState<IUser | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        verifyUser().then((response) => {
            if (!response.user) {
                navigate("/login");
            } else {
                setAccount(response.user);
            }
        });
    }, []);

    const logout = () => {
        logoutUser().then(() => navigate("/login"));
    };
    return account && <>
        <Sidebar account={account}/>
        <Outlet context={{ account, setAccount }} />
    </>
}