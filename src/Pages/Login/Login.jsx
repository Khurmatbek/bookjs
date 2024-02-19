import React from 'react'
import login_img from "../../../public/login.svg"
import { Link, useNavigate, } from 'react-router-dom'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useContext } from 'react';
import { TokenContext } from '../../Context/TokenContext';
import { DarkContext } from '../../Context/DarkContext';
const Login = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(TokenContext)
    const {DarkMode}=useContext(DarkContext)
    const validationSchema = Yup.object({
        email: Yup.string().email().required("Required"),
        password: Yup.string().min(3, "min lenght for password").max(8, "max length for password").required("Required"),
    })

    const onSubmit = (values) => {
        axios.post("http://localhost:5000/user/login", values).then(res => {
            if (res.status === 201) {
                setToken(res.data.token)
                localStorage.setItem("token", JSON.stringify(res.data.token))
                navigate("/")
            }
        })
    }
    return (
        <div className={DarkMode ? 'w-full bg-[#191919] h-screen' :"w-full bg-[#fff] h-screen"}>
            <div div className="container " >
                <ul className='flex items-center justify-between'>
                    <li className='register-left-box w-[50%] py-[100px] h-screen bg-[#D1B89DED] flex flex-col ' >
                        <img src={login_img} width={500} height={500} alt=" register part image" />
                    </li>
                    <li className='register-right-box w-[50%] h-screen py-[100px] '>
                        <div className='pl-[112px]'>
                            <h2 style={{
                                color: DarkMode? "#fff" : "#000"
                            }} className='sign-up-title mb-[10px]'>Sign IN</h2>
                            <p className='sign-up-desc mb-[21px]'>
                                Already have an account? <Link className='sign-up-link' to={"/register"}>Sign Up</Link>
                            </p>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                onSubmit={(values) => {
                                    onSubmit(values)
                                }}

                                validationSchema={validationSchema}
                            >
                                {({ isSubmitting }) => (
                                    <Form className='flex flex-col w-[330px] gap-[16px] text-white'>

                                        <Field className="px-[29px] pt-[16px] pb-[10px] bg-transparent outline-none" type="email" name="email" placeholder="Email" />
                                        <ErrorMessage className='text-[8px] m-0 text-red-500' name="email" component="div" />
                                        <Field className="px-[29px] pt-[16px] mb-[18px] pb-[10px] bg-transparent outline-none" type="password" name="password" placeholder="Password" />
                                        <ErrorMessage className='text-[8px] m-0 text-red-500' name="password" component="div" />
                                        <button
                                            className="px-[29px] text-black  pt-[16px] pb-[10px] rounded-full bg-white outline-none"
                                            type="submit" disabled={isSubmitting}>
                                            Next step
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                    </li>
                </ul>
            </div >
        </div >
    )
}

export default Login