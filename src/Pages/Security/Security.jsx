import React, { useContext, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import axios from 'axios'
import { TokenContext } from '../../Context/TokenContext';
import { useNavigate } from 'react-router-dom';
import i18n from '../../I18next';
import { t } from 'i18next';
import { DarkContext } from '../../Context/DarkContext';
const Security = () => {
    const navigate = useNavigate()
    const [updatePassword, setUpdatePassword] = useState("")
    const { token } = useContext(TokenContext)
    const { DarkMode, setDarkMode } = useContext(DarkContext);
    const validationSchema = Yup.object({
        email: Yup.string().email().required("Enter email"),
        currentPassword: Yup.string().required("Required password"),
        newPassword: Yup.string().required("Required password"),
    })

    const submitForm = (values) => {
        axios.put("http://localhost:5000/user/security", values, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        }).then(res => {
            if (res.status === 201) {
                setUpdatePassword(res.data)
                navigate("/")
            }
        })
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <h4 className='text-white text-[18px]'>{t("Security.Title")}</h4>
            <Formik
                className="flex flex-col"
                initialValues={{ email: '', currentPassword: '', newPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    submitForm(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='flex gap-[110px]'>
                        <div className='w-[707px] flex flex-col gap-[43px]'>
                            <label style={{ color: DarkMode ? "#F3F6F9" : "#464E5F" }} className='text-[#F3F6F9] text-[13px]'>
                                {t("Security.email")}
                                <Field type="text" name="email" className="w-full mt-[7px] text-[#000000] outline-none py-[12px] px-[20px]" placeholder="smth@gmail.com" />
                                <ErrorMessage name="email" component="div" />
                            </label>
                            <label style={{ color: DarkMode ? "#F3F6F9" : "#464E5F" }} className='text-[#F3F6F9] text-[13px]'>
                                {t("Security.currentPassword")}
                                <Field type="text" name="currentPassword" placeholder="current password" className="w-full mt-[7px] text-[#000000] outline-none py-[12px] px-[20px]" />
                                <ErrorMessage name="currentPassword" component="div" />
                            </label>
                            <label style={{ color: DarkMode ? "#F3F6F9" : "#464E5F" }} className='text-[#F3F6F9] text-[13px]'>
                                {t("Security.newPassword")}
                                <Field type="tel" name="newPassword" placeholder="new password" className="w-full mt-[7px] text-[#000000] outline-none py-[12px] px-[20px]" />
                                <ErrorMessage name="newPassword" component="div" />
                            </label>
                            <button
                                style={{
                                    color: DarkMode ? "black" : "white",
                                    background: DarkMode ? "#F1F6FF" : "#152540"

                                }}
                                type="submit" className='w-[182px] px-[12px] ml-auto font-[600] py-[12px] text-[#0D0D0D] text-[13px] bg-[#F1F6FF]' disabled={isSubmitting}>
                                {t("Security.save_changes")}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Security