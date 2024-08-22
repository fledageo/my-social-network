import React, { useState } from 'react'
import styles from "./Login.module.css"
import { TextField, Button } from '@mui/material'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { ILoginFormData } from '../../helpers/types'
import { loginUser } from '../../helpers/api'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const { register, handleSubmit,reset } = useForm()
  const [error,setError] = useState<string>("")
  const navigate = useNavigate()
  const handleLogin = (data:FieldValues) => {
    loginUser(data as ILoginFormData)
    .then(res => {
      if(res.status == "error"){
        setError(res.message as string)
        console.log(res)
      }else{
        setError("")
        reset()
        navigate("/profile")
      }
         
    })
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <form className={styles.formBlock} onSubmit={handleSubmit(handleLogin)}>
            <TextField
              type='text'
              label="Email"
              variant="outlined"
              {...register("login")}
            />
            <TextField
              type='password'
              label="Password"
              variant="outlined"
              {...register("password")}
            />
            <Button variant="contained" className={styles.submitBtn} type='submit'>Log in</Button>
          </form>
        </div>
      </div>
    </>
  )
}
