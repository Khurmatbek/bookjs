import React, { useContext, useEffect, useId, useState } from 'react'
import { useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import AdditionalContentExample from '../../Components/Update/Update';
import { useTranslation } from 'react-i18next';
import { MeContext } from '../../Context/MeContext';
import { DarkContext } from "../../Context/DarkContext"
const Profiles = () => {
    const { t, i18n } = useTranslation();
    const formdata = new FormData();
    const { me, setMe } = useContext(MeContext)
    const imgValue = useRef();
    const [userImg, SetUserImg] = useState("");
    const { token } = useContext(TokenContext)
    const [update, setUpdate] = useState(false)
    const { DarkMode, setDarkMode } = useContext(DarkContext)

    useEffect(() => {
        axios.get("http://localhost:5000/user/me", {
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 201) {

                setMe(res.data)
                localStorage.setItem("me", JSON.stringify(res.data.image))
            }
        })
    }, [update])

    const validationSchema = Yup.object({
        first_name: Yup.string().min(2, "Kam").max(20, "Kop").required("Please enter your first name."),
        last_name: Yup.string().min(2, "Kam").max(20, "Kop").required("Please enter your last name."),
        phone: Yup.string().required("Please enter your  phone number."),
    })
    const handleUserImg = () => {
        SetUserImg(imgValue.current.files[0])
        localStorage.setItem("userImg", JSON.stringify(imgValue.current.files[0]))
    }
    function submitForm(values) {
        formdata.append("first_name", values.first_name);
        formdata.append("last_name", values.last_name);
        formdata.append("phone", values.phone);
        formdata.append("image", userImg);


        axios.put("http://localhost:5000/user/account", formdata, {
            headers: {
                Authorization: token
            },

        }).then(res => {
            if (res.status === 201) {
                setUpdate(true)
            }
        });


    }




    return (
        update ?
            <div>
                <AdditionalContentExample update={update} setUpdate={setUpdate} />
            </div>
            :
            <ul className='flex items-start justify-center gap-[110px]'>

                <li className='profile-named-part'>

                    <h3 style={{ color: DarkMode ? "#DEDEDE" : "#212121" }} className='text-[#DEDEDE] text-[18px] pl-[290px] mb-[32px]'>
                        {t("Profile.main.my_profile")}
                    </h3>
                    <Formik
                        enableReinitialize={true}
                        className="flex flex-col"
                        initialValues={
                            {
                                first_name: me.first_name, last_name: me.last_name, phone: me.phone
                            }
                        }
                        validationSchema={validationSchema}
                        onSubmit={(values) => { submitForm(values) }}
                    >
                        {({ isSubmitting }) => (
                            <Form className='flex gap-[110px]'>
                                <label htmlFor="img" className='relative w-[175px]'>
                                    <span className='profile-input-file p-[9px] rounded-[8px] bg-[#161616] absolute top-[140px] left-[110px]   '>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                            <g clip-path="url(#clip0_1_1629)">
                                                <path d="M30.9287 24.75C30.9287 25.297 30.7114 25.8216 30.3246 26.2084C29.9378 26.5952 29.4133 26.8125 28.8663 26.8125H4.11769C3.57071 26.8125 3.04613 26.5952 2.65936 26.2084C2.27259 25.8216 2.0553 25.297 2.0553 24.75V12.375C2.0553 11.828 2.27259 11.3034 2.65936 10.9166C3.04613 10.5298 3.57071 10.3125 4.11769 10.3125H6.5348C8.17488 10.3116 9.74751 9.65952 10.9071 8.49956L12.6188 6.79181C13.0045 6.406 13.5273 6.18871 14.0728 6.1875H18.907C19.454 6.18762 19.9785 6.40499 20.3651 6.79181L22.0728 8.49956C22.6474 9.07441 23.3297 9.5304 24.0806 9.84147C24.8315 10.1525 25.6364 10.3126 26.4492 10.3125H28.8663C29.4133 10.3125 29.9378 10.5298 30.3246 10.9166C30.7114 11.3034 30.9287 11.828 30.9287 12.375V24.75ZM4.11769 8.25C3.02373 8.25 1.97458 8.6846 1.20104 9.45818C0.427492 10.2318 -0.00708008 11.281 -0.00708008 12.375L-0.00708008 24.75C-0.00708008 25.844 0.427492 26.8932 1.20104 27.6668C1.97458 28.4404 3.02373 28.875 4.11769 28.875H28.8663C29.9602 28.875 31.0094 28.4404 31.7829 27.6668C32.5565 26.8932 32.991 25.844 32.991 24.75V12.375C32.991 11.281 32.5565 10.2318 31.7829 9.45818C31.0094 8.6846 29.9602 8.25 28.8663 8.25H26.4492C25.3553 8.24977 24.3063 7.81502 23.533 7.04138L21.8253 5.33362C21.0519 4.55998 20.003 4.12523 18.9091 4.125H14.0749C12.981 4.12523 11.932 4.55998 11.1587 5.33362L9.45101 7.04138C8.67764 7.81502 7.62866 8.24977 6.5348 8.25H4.11769Z" fill="#464E5F" />
                                                <path d="M16.4922 22.6875C15.1248 22.6875 13.8133 22.1443 12.8464 21.1773C11.8795 20.2103 11.3363 18.8988 11.3363 17.5312C11.3363 16.1637 11.8795 14.8522 12.8464 13.8852C13.8133 12.9182 15.1248 12.375 16.4922 12.375C17.8597 12.375 19.1711 12.9182 20.138 13.8852C21.105 14.8522 21.6482 16.1637 21.6482 17.5312C21.6482 18.8988 21.105 20.2103 20.138 21.1773C19.1711 22.1443 17.8597 22.6875 16.4922 22.6875ZM16.4922 24.75C18.4066 24.75 20.2427 23.9895 21.5964 22.6357C22.9501 21.2819 23.7106 19.4458 23.7106 17.5312C23.7106 15.6167 22.9501 13.7806 21.5964 12.4268C20.2427 11.073 18.4066 10.3125 16.4922 10.3125C14.5778 10.3125 12.7418 11.073 11.3881 12.4268C10.0344 13.7806 9.27388 15.6167 9.27388 17.5312C9.27388 19.4458 10.0344 21.2819 11.3881 22.6357C12.7418 23.9895 14.5778 24.75 16.4922 24.75ZM6.1803 13.4062C6.1803 13.6798 6.07166 13.9421 5.87827 14.1355C5.68489 14.3289 5.4226 14.4375 5.14911 14.4375C4.87562 14.4375 4.61334 14.3289 4.41995 14.1355C4.22656 13.9421 4.11792 13.6798 4.11792 13.4062C4.11792 13.1327 4.22656 12.8704 4.41995 12.677C4.61334 12.4836 4.87562 12.375 5.14911 12.375C5.4226 12.375 5.68489 12.4836 5.87827 12.677C6.07166 12.8704 6.1803 13.1327 6.1803 13.4062Z" fill="#464E5F" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1_1629">
                                                    <rect width="32.9981" height="33" fill="white" transform="translate(-0.00708008)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <input type="file" onChange={handleUserImg} ref={imgValue} id='img' name="image" className='hidden' />
                                    <div className='w-[175px] flex flex-col items-center justify-center h-[175px] object-cover rounded-full overflow-hidden bg-white'>
                                        <img src={"http://localhost:5000/" + JSON.parse(localStorage.getItem("me"))} className='object-cover ' alt="" />
                                    </div>
                                </label>

                                <div className='w-[707px] flex flex-col gap-[43px]'>
                                    <label style={{ color: DarkMode ? "#DEDEDE" : "#212121" }} className='text-[#F3F6F9] text-[13px]'>
                                        {t("Profile.main.first_name")}
                                        <Field type="text" name="first_name" className="w-full mt-[7px] text-[#000000] outline-none py-[12px] border-none px-[20px] bg-[#F3F6F9]" placeholder="John" />
                                        <ErrorMessage name="first_name" component="div" />
                                    </label>
                                    <labe style={{ color: DarkMode ? "#DEDEDE" : "#212121" }} className='text-[#F3F6F9] text-[13px]'>
                                        {t("Profile.main.last_name")}
                                        <Field type="text" name="last_name" placeholder="Wick" className="w-full mt-[7px] text-[#000000] bg-[#F3F6F9] border-none outline-none py-[12px] px-[20px]" />
                                        <ErrorMessage name="last_name" component="div" />
                                    </labe>
                                    <label style={{ color: DarkMode ? "#DEDEDE" : "#212121" }} className='text-[#F3F6F9] text-[13px]'>
                                        {t("Profile.main.phone")}
                                        <Field type="tel" name="phone" placeholder="+998765161514" className="w-full mt-[7px] text-[#000000] border-none bg-[#F3F6F9] outline-none py-[12px] px-[20px]" />
                                        <ErrorMessage name="phone" component="div" />
                                    </label>
                                    <button style={{
                                        color: DarkMode ? "black" : "white",
                                        background: DarkMode ? "#F1F6FF" : "#152540"

                                    }} type="submit" className='w-[142px] px-[12px] ml-auto font-[600] py-[12px] text-[#0D0D0D] text-[13px] bg-[#F1F6FF]' disabled={isSubmitting}>
                                        {t("Profile.main.save_changes")}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </li>
            </ul >

    )
}

export default Profiles