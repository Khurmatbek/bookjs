import React, { useContext, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DarkContext } from '../../Context/DarkContext';

const AddAuthor = () => {
    const { t, i8n } = useTranslation()
    const navigate = useNavigate()
    const { DarkMode, setDarkMode } = useContext(DarkContext)
    const { token } = useContext(TokenContext);
    const formdata = new FormData();
    const authorImgValue = useRef();
    const ganreValue = useRef();
    const bioValue = useRef();
    const [authorImg, setAuthorImg] = useState();
    const [ganre, setGanre] = useState();
    const [bio, setBio] = useState();

    const handleAuthorImg = () => {
        setAuthorImg(authorImgValue.current.files[0])
    }
    const handleAuthorGanre = () => {
        setGanre(ganreValue.current.value)
    }
    const handleAuthorBio = () => {
        setBio(bioValue.current.value)
    }


    const validationSchema = Yup.object({
        first_name: Yup.string().min(2, "Kam").max(20, "Kop").required("Please enter your Author title."),
        last_name: Yup.string().min(2, "Kam").max(20, "Kop").required("Please enter your page."),
        date_of_birth: Yup.string().required("Please enter your year."),
        date_of_death: Yup.string().required("Please enter your price."),
        country: Yup.string().required("Please enter your country")
    })
    const onSubmit = (values) => {
        formdata.append("first_name", values.first_name);
        formdata.append("last_name", values.last_name);;
        formdata.append("date_of_birth", values.date_of_birth);
        formdata.append("date_of_death", values.date_of_death);
        formdata.append("country", values.country);
        formdata.append("genre_id", Number(ganre));
        formdata.append("bio", bio);
        formdata.append("image", authorImg);
        axios.post("http://localhost:5000/author", formdata, {
            headers: {
                Authorization: token,
            }

        })
            .then(res => {
                navigate("/add_book")
            })

    }



    return (
        <div className='h-screen '>

            <Formik
                initialValues={{ first_name: '', last_name: '', date_of_birth: "", date_of_death: "", country: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmit(values)

                }}
            >
                {({ isSubmitting }) => (
                    <Form className='flex h-full '>
                        <div style={{ background: DarkMode ? "#1B1B1B" : "#F3F3F3ED" }} className='w-1/2 flex flex-col items-center justify-center'>
                            <label style={{
                                background: DarkMode ? "#4D4D4D" : "#F8F8F8"

                            }} className='w-[315px] relative  h-[428px] overflow-hidden  border-[1px] rounded-[17px] border-dashed' htmlFor="img">
                                <input className='hidden' ref={authorImgValue} onChange={handleAuthorImg} id='img' name='' type="file" />
                                {
                                    authorImg ? <img className='w-[315px] rounded-[17px] h-[428px]' src={URL.createObjectURL(authorImg)} alt="" /> : <img className='w-[315px] h-[428px]' src="" alt="" />
                                }
                                <span style={{
                                    color: DarkMode ? "#FFFFFF" : "#000000",
                                    opacity: " 0.3"
                                }} className='absolute top-[180px] flex flex-col items-center text-[12px] w-[169px] opacity-30 left-[80px] text-center '>
                                    <svg style={{
                                        fill: DarkMode ? "#FFFFFF" : "#000000"
                                    }} xmlns="http://www.w3.org/2000/svg" width="63" height="62" viewBox="0 0 63 62" fill="none"
                                    >
                                        <g opacity="0.3" clip-path="url(#clip0_1_2622)">
                                            <path d="M10.1875 31H52.8125" stroke="#000000" stroke-width="3.875" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M31.5 9.6875V52.3125" stroke="#000000" stroke-width="3.875" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_2622">
                                                <rect width="62" height="62" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Click or drag file to this area to upload
                                </span>
                            </label>
                        </div>
                        <div style={{
                            background: DarkMode ? "#191919" : "#FFF"
                        }} className='w-1/2 flex flex-col text-start items-center justify-center bg-[#1B1B1B] gap-[16px] '>
                            <div className='w-[330px]'>
                                <h2 style={{
                                    color: DarkMode ? "#FFFFFF" : "#000000"
                                }} className=' text-[32px]'>{t("Add_author.Title")}</h2>
                            </div>
                            <Field className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="text" name="first_name" placeholder={t("Add_author.first_name")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="first_name" component="div" />
                            <Field className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="text" name="last_name" placeholder={t("Add_author.last_name")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="last_name" component="div" />
                            <Field className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="number" name="date_of_birth" placeholder={t("AuthorSinglePage.tugilgan_yili")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="date_of_birth" component="div" />
                            <Field className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="number" name="date_of_death" placeholder={t("AuthorSinglePage.vafot_etgan_yili")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="date_of_death" component="div" />
                            <Field className="px-[29px] w-[330px] pt-[16px] mb-[18px] pb-[10px] bg-transparent outline-none" type="text" name="country" placeholder={
                                t("Add_author.country")
                            } />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="country" component="div" />
                            <select onChange={handleAuthorGanre} ref={ganreValue} className='px-[29px] text-[14px]  border rounded-[10px] w-[330px] pt-[16px] mb-[18px] pb-[10px] border-[#B4B4BB] bg-transparent outline-none' name="genre_id" id="">
                                <option value="1">{t("Add_author.ganre")}</option>
                                <option value="1">{t("homePage.main.category1")}</option>
                                <option value="2">{t("homePage.main.category2")}</option>
                                <option value="3">{t("homePage.main.category3")}</option>
                                <option value="4">{t("homePage.main.category4")}</option>
                            </select>
                            <textarea onChange={handleAuthorBio} ref={bioValue} name="bio" placeholder={t("Add_author.bio")} className='w-[330px] bg-transparent outline-none border-[#B4B4BB] border rounded-lg px-[23px] py-[13px]'>

                            </textarea>
                            <button style={{
                                background: DarkMode ? "#F3F3F3" : "#152540",
                                color: DarkMode ? "#000" : "#F3F3F3"
                            }} disabled={isSubmitting}
                                className="px-[29px] w-[330px]  pt-[16px] pb-[10px] rounded-full outline-none"
                                type="submit" >
                                {t("Add_author.create")}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddAuthor