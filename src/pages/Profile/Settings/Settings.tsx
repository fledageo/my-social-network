import React, { useState } from 'react'
import styles from "./Settings.module.css"
import { Accordion, AccordionSummary, AccordionDetails, Button, TextField } from '@mui/material'
import { GoChevronDown } from "react-icons/go";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IContext } from '../../../helpers/types';
import { handlePrivacyStatus, handleChangePassword } from '../../../helpers/api';
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";


export const Settings = () => {
  const { account, setAccount } = useOutletContext<IContext>();
  const [error, setError] = useState<string>("");
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
      console.log(response)
      // setError("");
      // navigate("/login");
    });
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
                    <TextField size="small" label="Old password" variant="outlined" name='old' />
                    <TextField size="small" label="New password" variant="outlined" name='newpwd' />
                    <Button variant="outlined" type='submit' onClick={handlePasswordChange}>Change</Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className={styles.settingsAccordion}>
              <AccordionSummary
                expandIcon={<GoChevronDown />}
              >
                Accordion 1
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
