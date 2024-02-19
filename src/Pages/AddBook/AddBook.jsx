import React, { useContext, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { BookContext } from '../../Context/BookContext';
import { useTranslation } from 'react-i18next';
import { DarkContext } from '../../Context/DarkContext';

const AddBook = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const { token } = useContext(TokenContext)
    const { name } = useParams();
    const bookImgValue = useRef();
    const genreValue = useRef();
    const authorValue = useRef();
    const bioValue = useRef();
    const [bookimg, setBookimg] = useState()
    const [genre, setGenre] = useState();
    const [author, setAuthor] = useState();
    const [bio, setBio] = useState();
    const [authorId, setAuthorId] = useState({});
    const [authors, setAuthors] = useState([])
    const { bookinfo, setBookinfo } = useContext(BookContext);
    const { DarkMode, setDarkMode } = useContext(DarkContext);

    const handleBookImg = () => {
        setBookimg(bookImgValue.current.files[0])
    }
    const handleGanre = () => {
        setGenre(genreValue.current.value)
        console.log(genreValue.current.value)
        axios.get("http://localhost:5000/author/genreId/" + genreValue.current.value).then(res => {
            console.log(res.data)
            setAuthors(res.data)
        })
    }
    const handleBio = () => {
        setBio(bioValue.current.value)
    }
    const formdata = new FormData();


    const validationSchema = Yup.object({
        title: Yup.string().min(2, "Kam").max(20, "Kop").required("Please enter your book title."),
        page: Yup.string().min(2, "Kam").max(20, "Kop").required("Please enter your page."),
        year: Yup.string().required("Please enter your year."),
        price: Yup.string().required("Please enter your price."),
    })
    const handleAuthor = () => {
        setAuthorId(authorValue.current.value)
        console.log(authorValue.current.value)
    }
    const onSubmit = (values) => {
        formdata.append("title", values.title);
        formdata.append("page", values.page);;
        formdata.append("year", values.year);
        formdata.append("price", values.price);
        formdata.append("genre_id", Number(genre));
        formdata.append("author_id", authorValue.current.value);
        formdata.append("image", bookimg);
        formdata.append("description", bio);
        console.log(formdata);
        axios.post("http://localhost:5000/book", formdata, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    navigate("/")
                }
            });

    }
    return (
        <div className='h-screen '>

            <Formik
                initialValues={{ title: "", page: "", year: "", price: "", }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmit(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='flex h-full'>
                        <div style={{
                            background: DarkMode ? "#1B1B1B" : "#F3F3F3"
                        }} className='w-1/2 flex flex-col items-center justify-center'>
                            <label style={{
                                background: DarkMode ? "#4D4D4D" : "#F8F8F8"

                            }} className='w-[315px] relative h-[428px] overflow-hidden bg-[rgb(77,77,77)] border-[1px] rounded-[17px] border-dashed' htmlFor="img">
                                <input className='hidden border-none' ref={bookImgValue} onChange={handleBookImg} id='img' name='' type="file" />
                                {
                                    bookimg ? <img className='w-[315px] rounded-[17px] border-none h-[428px]' src={URL.createObjectURL(bookimg)} alt="" /> : <img className='w-[315px] h-[428px]' src="" alt="" />
                                }
                                <span style={{
                                    color: DarkMode ? "#FFFFFF" : "#000000",
                                    opacity: " 0.3"
                                }} className='absolute top-[180px] flex flex-col items-center text-[12px] w-[169px] opacity-30 left-[80px] text-center  '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="63" height="62" viewBox="0 0 63 62" fill="none">
                                        <g opacity="0.3" clip-path="url(#clip0_1_2622)">
                                            <path d="M10.1875 31H52.8125" stroke="black" stroke-width="3.875" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M31.5 9.6875V52.3125" stroke="black" stroke-width="3.875" stroke-linecap="round" stroke-linejoin="round" />
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
                            background: DarkMode ? " #191919" : "#FFF"
                        }} className='w-1/2 flex flex-col text-start items-center justify-center bg-[#1B1B1B] gap-[16px] '>
                            <div className='w-[330px]'>
                                <h2 style={{
                                    color: DarkMode ? "#f5f5f5" : ""
                                }} className='text-white text-[32px]'>{t("Add_book.Title")}</h2>
                            </div>
                            <Field style={{
                                color:DarkMode ? "#f5f5f5":"#000"
                            }} className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="text" name="title" placeholder={t("Add_book.title")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="title" component="div" />
                            <Field style={{
                                color: DarkMode ? "#f5f5f5" : "#000"
                            }} className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="text" name="page" placeholder={t("Add_book.page")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="page" component="div" />
                            <Field style={{
                                color: DarkMode ? "#f5f5f5" : "#000"
                            }} className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="number" name="year" placeholder={t("Add_book.year")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="year" component="div" />
                            <Field style={{
                                color: DarkMode ? "#f5f5f5" : "#000"
                            }} className="px-[29px] w-[330px] pt-[16px] pb-[10px] bg-transparent outline-none" type="number" name="price" placeholder={t(" Add_book.price")} />
                            <ErrorMessage className='text-[8px] m-0 text-red-500' name="price" component="div" />

                            <select className='px-[29px] text-[14px] text-[#AAAAAA]   border rounded-[10px] w-[330px] pt-[16px] mb-[18px] pb-[10px] border-[#B4B4BB] bg-transparent outline-none' ref={genreValue} name="genre_id" id="" onChange={handleGanre}>
                                <option value="1">{t("Add_book.ganre")}</option>
                                <option value="1">{t("homePage.main.category1")}</option>
                                <option value="2">{t("homePage.main.category2")}</option>
                                <option value="3">{t("homePage.main.category3")}</option>
                                <option value="4">{t("homePage.main.category4")}</option>
                            </select>
                            <select className='px-[29px] text-[14px]  border rounded-[10px] w-[330px] pt-[16px] mb-[18px] pb-[10px] border-[#B4B4BB] text-[#AAAAAA] bg-transparent outline-none' ref={authorValue} name="author_id" onClick={handleAuthor}>
                                {
                                    authors ? authors.map(item => (
                                        <option key={item.id} value={item.id}>{item.first_name + " " + item.last_name}</option>
                                    )) : ""
                                }
                            </select>
                            <textarea name="bio" onChange={handleBio} defaultValue={"salom"} ref={bioValue} placeholder={t("Add_book.bio")} className='w-[330px] bg-transparent outline-none border-[#B4B4BB] border rounded-lg px-[23px] text-[#AAAAAA] py-[13px]'>

                            </textarea>
                            <button
                                style={{
                                    background: DarkMode ? "#FFFFFF " : "#152540",
                                    color: DarkMode ? "black" : "white",
                                }}
                                disabled={isSubmitting}
                                className="px-[29px] w-[330px] pt-[16px] pb-[10px] rounded-full outline-none"
                                type="submit" >
                                {t("Add_book.create")}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddBook