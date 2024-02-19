import React, { createContext, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import register_img from "../../../public/register.svg"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { TokenContext } from '../../Context/TokenContext';
import { MeContext } from '../../Context/MeContext';
import { DarkContext } from '../../Context/DarkContext';
const Register = () => {
    const navigate = useNavigate()
    const { token, setToken } = useContext(TokenContext)
    const{DarkMode}=useContext(DarkContext)
    const { me, setMe } = useContext(MeContext)
    const validationSchema = Yup.object({
        email: Yup.string().email().required("Required"),
        password: Yup.string().min(3, "min lenght for password").max(8, "max length for password").required("Required"),
        first_name: Yup.string().min(2, "Kam").max(20, "Kop").required("Required"),
        last_name: Yup.string().min(2, "Kam").max(20, "Kop").required("Required"),
        phone: Yup.string().required("Required"),
    })
    const onSubmit = (values) => {
        axios.post("http://localhost:5000/user/register", values).then(res => {
            if (res.status === 201) {
                setToken(res.data.token)
                setMe(res.data)
                // localStorage.setItem("me", JSON.stringify(res.data))
                localStorage.setItem("token", JSON.stringify(res.data.token))

                navigate("/")
            }
        }).catch(err => console.log(err))
    }
    return (
        <div className={DarkMode ?" bg-[#191919]":'w-full bg-[#fff]'}>
            <div div className="container " >
                <ul className='flex items-center justify-between'>
                    <li className='register-left-box w-[50%]  py-[100px] bg-[#D1B89DED] flex flex-col ' >
                        <img src={register_img} width={500} height={500} alt=" register part image" />
                    </li>
                    <li className='register-right-box w-[50%]'>
                        <div className='pl-[112px]'>
                            <h2 style={{
                                color: DarkMode ? "#fff" : "#000"
                            }} className='sign-up-title mb-[10px]'>Sign up</h2>
                            <p className='sign-up-desc mb-[21px]'>
                                Already have an account? <Link className='sign-up-link' to={"/login"}>Sign in</Link>
                            </p>
                            <Formik
                                initialValues={{ email: '', password: '', first_name: "", last_name: "", phone: "" }}
                                onSubmit={(values) => {
                                    onSubmit(values)
                                }}
                                validationSchema={validationSchema}
                            >
                                {({ isSubmitting }) => (
                                    <Form className='flex flex-col w-[330px] gap-[14px] text-[#000]'>
                                        <Field className="px-[29px] pt-[16px] pb-[10px] bg-transparent outline-none" type="text" name="first_name" placeholder="First name" />
                                        <ErrorMessage className='text-[8px] m-0 text-red-500' name="first_name" component="div" />
                                        <Field className="px-[29px] pt-[16px] pb-[10px] bg-transparent outline-none" type="text" name="last_name" placeholder="Last name" />
                                        <ErrorMessage className='text-[8px] m-0 text-red-500' name="last_name" component="div" />
                                        <Field className="px-[29px] pt-[16px] pb-[10px] bg-transparent outline-none" type="tel" name="phone" placeholder="Phone" />
                                        <ErrorMessage className='text-[8px] m-0 text-red-500' name="phone" component="div" />
                                        <Field className="px-[29px] pt-[16px] pb-[10px] bg-transparent outline-none" type="email" name="email" placeholder="Email" />
                                        <ErrorMessage className='text-[8px] m-0 text-red-500' name="email" component="div" />
                                        <Field className="px-[29px] pt-[16px] text-gray mb-[18px] pb-[10px] bg-transparent outline-none" type="password" name="password" placeholder="Password" />
                                        <ErrorMessage className='text-[8px] m-0 text-red-500' name="password" component="div" />
                                        <button disabled={isSubmitting}
                                            className="px-[29px] text-black  pt-[16px] pb-[10px] rounded-full bg-white outline-none"
                                            type="submit" >
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

export default Register