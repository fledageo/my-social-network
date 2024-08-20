import React, { useState } from 'react'
import styles from "./Settings.module.css"
import { Accordion, AccordionSummary, AccordionDetails, Button, TextField } from '@mui/material'
import { GoChevronDown } from "react-icons/go";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IChangeLoginData, IContext } from '../../../helpers/types';
import { handlePrivacyStatus, handleChangePassword, handleChangeLogin } from '../../../helpers/api';
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";




export const Settings = () => {
  const { account, setAccount } = useOutletContext<IContext>();
  const [error, setError] = useState<string>("");
  const [changeLoginData, setChangeLoginData] = useState<IChangeLoginData>({ login: "", password: "" })

  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const navigate = useNavigate();


  const handleChangeStatus = () => {
    handlePrivacyStatus().then((response) => {
      setAccount({ ...account, isPrivate: response.payload as number });
    });
  };

  const handlePasswordChange = () => {
    const form = new FormData();

    form.append("old", oldPass);
    form.append("newpwd", newPass);

    handleChangePassword(form)
      .then((response) => {
        navigate("/login");
      });
  }


  const handleLoginChange = () => {

    handleChangeLogin(changeLoginData)
      .then(res => {
        if (res.status != "error") {
          setChangeLoginData({ login: "", password: "" })
          navigate("/login");
        }
      })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.accordionsBlock}>
            <Accordion className={styles.settingsAccordion}>
              <AccordionSummary
                expandIcon={<GoChevronDown />}
              >
                Lock your profile
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.actionWrapper}>
                  <span className={styles.statusText}>Your profile is {account.isPrivate == 1 ? "locked" : "unlocked"} </span>
                  <Button variant="outlined" sx={{ borderRadius: '30px' }} onClick={handleChangeStatus}>
                    {
                      account.isPrivate == 0 ? <CiUnlock size={25} /> : <CiLock size={25} />
                    }
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className={styles.settingsAccordion}>
              <AccordionSummary
                expandIcon={<GoChevronDown />}
              >
                Change your password
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.actionWrapper}>
                  <div className={styles.changeBlock}>
                    <TextField
                      size="small"
                      label="Old password"
                      variant="outlined"
                      name='old'
                      type='password'
                      onChange={(e) => setOldPass(e.target.value)}
                    />
                    <TextField
                      size="small"
                      label="New password"
                      variant="outlined"
                      name='newpwd'
                      type='password'
                      sx={{ margin: "20px 0" }}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    <Button
                      variant="outlined"
                      onClick={handlePasswordChange}
                      type="submit"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className={styles.settingsAccordion}>
              <AccordionSummary
                expandIcon={<GoChevronDown />}
              >
                Change Email
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.actionWrapper}>
                  <div className={styles.changeBlock}>
                    <TextField
                      size="small"
                      label="New Email"
                      variant="outlined"
                      name='old'
                      onChange={(e) => setChangeLoginData({ ...changeLoginData, login: e.currentTarget.value })}
                    />
                    <TextField
                      size="small"
                      label="Password"
                      variant="outlined"
                      name='newpwd'
                      type='password'
                      onChange={(e) => setChangeLoginData({ ...changeLoginData, password: e.currentTarget.value })}
                      sx={{ margin: "20px 0" }}

                    />
                    <Button
                      variant="outlined"
                      onClick={handleLoginChange}
                      type="submit"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
