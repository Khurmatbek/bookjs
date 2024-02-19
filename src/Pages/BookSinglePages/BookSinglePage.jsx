import React, { useContext, useEffect, useState } from 'react'
import qorqma_img from "../../../public/qorqma_img.png"
import { TfiArrowDown } from "react-icons/tfi";
import "./BookSinglePage.css"
import BookCards from '../../Components/BookCards/BookCards';
import { useParams } from 'react-router-dom';
import BookList from '../../Components/BookList/BookList';
import { BookContext } from '../../Context/BookContext';
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import BookSingleList from '../../Components/BookSinglePageList/BookSingleList';
import { useTranslation } from 'react-i18next';
import { DarkContext } from '../../Context/DarkContext';


const BookSinglePage = () => {
    const { t, i18n } = useTranslation();
    const [booksingle, setBooksingle] = useState({});
    const { DarkMode, setDarkMode } = useContext(DarkContext);
    const { name } = useParams();
    const { token } = useContext(TokenContext)
    useEffect(() => {
        axios.get("http://localhost:5000/book/bookId/" + name, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 201) {
                setBooksingle(res.data)
            }
        })

    }, [name])

    return (
        <div>
            <ul className='flex justify-between items-start pb-[100px]' >
                <li className='w-[505px] h-[600px]'>
                    {
                        booksingle.image ? <div className='w-[505px] h-[600px] overflow-hidden rounded-[20px]'>
                            <img src={"http://localhost:5000/" + booksingle?.image} width={505} height={600} className='rounded-[20px]' alt="bookimge" />
                        </div> : <div className='w-[505px] h-[600px] rounded-[20px] bg-gray-500'>

                        </div>
                    }
                </li>
                <li className='w-[672px]'>
                    <h3 className='book-page-name text-[#C9AC8C] text-[48px]'>
                        {booksingle.title}
                    </h3>
                    <div>
                        <ul className='flex flex-col gap-[14px]'>
                            <li>
                                <div className='flex justify-between'>
                                    <strong style={{ color: DarkMode ? "rgba(255, 255, 255, 0.60) ]" : "rgba(13, 13, 13, 0.60) " }} className='book-page-countered text-[#fff] font-[400] text-[20px] opacity-60'>
                                        {t("BookSinglepage.sahifalar_soni")}:
                                    </strong>
                                    <p style={{ color: DarkMode ? "#FFF" : "#000" }} className='text-[20px] '>
                                        {booksingle.page} {t("BookSinglepage.page")}
                                    </p>
                                </div>

                            </li>
                            <li>
                                <div className='flex justify-between'>
                                    <strong style={{ color: DarkMode ? "rgba(255, 255, 255, 0.60) ]" : "rgba(13, 13, 13, 0.60) " }} className='text-[#fff] font-[400] text-[20px] opacity-60'>
                                        {t("BookSinglepage.chop_etilgan")}:
                                    </strong>
                                    <p style={{ color: DarkMode ? "#FFF" : "#000" }} className='text-[20px]'>
                                        {booksingle.year} {t("BookSinglepage.years")}
                                    </p>
                                </div>
                            </li>
                            <li className='mb-[40px]'>
                                <div className='flex justify-between'>
                                    <strong style={{ color: DarkMode ? "rgba(255, 255, 255, 0.60) ]" : "rgba(13, 13, 13, 0.60) " }} className='text-[#fff] font-[400] opacity-60 text-[20px]'>
                                        {t("BookSinglepage.narxi")}:
                                    </strong>
                                    <p style={{ color: DarkMode ? "#FFF" : "#000" }} className='text-[20px]'>
                                        ${booksingle.price}
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div className='flex gap-3 items-center justify-between mb-[12px]'>
                            <button className='flex gap-2 border-none items-center outline-none text-[#C9AC8C]  '>{
                                t("BookSinglepage.toliq_malumot")
                            } <TfiArrowDown /> </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="511" height="2" viewBox="0 0 511 2" fill="none">
                                <path d="M0.364014 1.5L511 0.5" stroke="#D1B89D" stroke-opacity="0.6" />
                            </svg>
                        </div>
                        <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.80)" :"rgba(13, 13, 13, 0.80)"}} className='book-page-info'>
                            {booksingle.description}
                        </p>
                    </div>
                </li>
            </ul>
            <div className='author-page-asarlar pb-[20px]'>
                <div className='flex justify-between items-center'>
                    <strong className='text-[#C9AC8C] mb-[15px] text-[31px]'>{
                        t("BookSinglepage.asarlari")
                    }</strong>
                    <button style={{color:DarkMode? "white":"black"}} className='rounded-none border-none outline-none   text-[16px]'>{t("BookSinglepage.barchasini_korish")}</button>
                </div>
                {
                    <BookSingleList id={booksingle?.author_id} />
                }
            </div>


        </div>
    )
}

export default BookSinglePage