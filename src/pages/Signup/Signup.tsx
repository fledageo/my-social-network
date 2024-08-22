import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { ISignupFormData } from '../../helpers/types'
import styles from "./Signup.module.css"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewUser } from '../../helpers/api'
import { useNavigate } from 'react-router-dom'


const validSchema = Yup.object({
    name: Yup.string()
        .required("Required field"),
    surname: Yup.string()
        .required("Required field"),
    login: Yup.string()
        .required("Required field")
        .email('Invalid email format.'),
    password: Yup.string()
        .required("Required field")
        .min(6, "Please enter a password with at least 6 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Must contain letter,number, and special character."),
    confirm: Yup.string()
        .required("Required field")
        .oneOf([Yup.ref('password')], 'Passwords must match')

})

const fieldStyles = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "rgb(0, 212, 255)", // Default border color
        },
        "&:hover fieldset": {
            borderColor: "rgb(0, 212, 255)", // Border color on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "rgb(0, 212, 255)", // Border color when focused
        },
    },
    "& .MuiInputLabel-root": {
        color: "rgb(0, 212, 255)", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(0, 212, 255)", // Label color when focused
    },
    "& .MuiInputBase-input": {
        color: "white", // Text color
    },
}
const errorFieldsStyle = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#E4462E", // Default border color
        },
        "&:hover fieldset": {
            borderColor: "#B33C29", // Border color on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "#E4462E", // Border color when focused
        },
    },
    "& .MuiInputLabel-root": {
        color: "#E4462E", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#E4462E", // Label color when focused
    },
    "& .MuiInputBase-input": {
        color: "#E4462E", // Text color
    },
    '& .MuiFormHelperText-root': {
        color: "#E4462E",  // Customize color
    },
}

const Signup = () => {
    const { register, handleSubmit, formState: { errors },reset} = useForm({ resolver: yupResolver(validSchema) })
    const [error,setError] = useState<string>("")
    const navigate = useNavigate()

    const handleSignup: SubmitHandler<ISignupFormData> = (data) => {
        delete data.confirm
        addNewUser(data)
        .then(res => {
            if(res.status == "error" && res.message){
                setError(res.message)
            }else{
                reset()
                setError("")
                navigate("/login")
            }
        })
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.mainWrapper}>
                <div className={styles.leftPart}>
                    <form onSubmit={handleSubmit(handleSignup)} className={styles.formBlock}>
                        <div className={styles.fieldsWrapper}>
                        <p className={styles.helperText}>{error ? error : ""}</p>
                            <div className={styles.nameSurnameBlock}>
                                <TextField
                                    error={Boolean(errors.name)}
                                    label="Name"
                                    variant="outlined"
                                    {...register("name")}
                                    className={`${styles.inputField},${styles.nameField}`}
                                    sx={errors.name ? errorFieldsStyle : fieldStyles}
                                    helperText={errors.name ? errors.name.message : ""}
                                />
                                <TextField
                                    error={Boolean(errors.surname)}
                                    label="Surname"
                                    variant="outlined"
                                    {...register("surname")}
                                    className={`${styles.inputField},${styles.surnameField}`}
                                    sx={errors.surname ? errorFieldsStyle : fieldStyles}
                                    helperText={errors.surname ? errors.surname.message : ""}
                                />
                            </div>
                            <TextField
                                error={Boolean(errors.login)}
                                label="Email"
                                variant="outlined"
                                {...register("login")}
                                className={styles.inputField}
                                sx={errors.login ? errorFieldsStyle : fieldStyles}
                                helperText={errors.login ? errors.login.message : ""}
                            />
                            <TextField
                                error={Boolean(errors.password)}
                                type='password'
                                label="Password"
                                variant="outlined"
                                {...register("password")}
                                className={styles.inputField}
                                sx={errors.password ? errorFieldsStyle : fieldStyles}
                                helperText={errors.password ? errors.password.message : ""}
                            />
                            <TextField
                                error={Boolean(errors.confirm)}
                                type='password'
                                label="Confirm password"
                                variant="outlined"
                                {...register("confirm")}
                                className={styles.inputField}
                                sx={errors.confirm ? errorFieldsStyle : fieldStyles}
                                helperText={errors.confirm ? errors.confirm.message : ""}
                            />
                            <Button variant="contained" className={styles.submitBtn} type='submit'>sign up</Button>
                        </div>
                    </form>
                </div>
                <div className={styles.rightPart}>
                    <div className={styles.welcomeBlock}>
                        <span className={styles.welcomeTitle}>
                            Hello,Friend!
                        </span>
                        <span className={styles.welcomeText}>
                            Enter your personal details and meet new friends
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup