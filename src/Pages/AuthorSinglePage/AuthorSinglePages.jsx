import React, { useContext, useEffect, useState } from 'react'
import "./AuthorSinglePages.css"
import hoshimov_img from "../../../public/hoshimov.png"
import BookCards from "../../Components/BookCards/BookCards"
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { TokenContext } from '../../Context/TokenContext'
import BookList from '../../Components/BookList/BookList'
import AuthorSinglePageList from '../../Components/AuthorSinglePageList/AuthorSinglePageList'
import { useTranslation } from 'react-i18next'
import { DarkContext } from '../../Context/DarkContext'
// import { AuthorContext } from '../../Context/AuthorContext'
// import { useContext } from 'react'


const AuthorSinglePages = () => {
    const { t, i18 } = useTranslation();
    const { name } = useParams();
    const { token } = useContext(TokenContext)
    const [authorSingle, setAuthorSingle] = useState({})

    const { DarkMode, setDarkMode } = useContext(DarkContext);


    useEffect(() => {
        axios.get(`http://localhost:5000/author/authorId/${Number(name)}`, {
            headers: {
                Authorization: token,
            }
        }).then(res => {
            if (res.status === 201) {
                setAuthorSingle(res.data)
            }
        })
    }, [name])

    return (
        <div>
            <ul className='author-page-list flex items-center  justify-between pb-[100px]'>
                <li className='w-[505px]'>
                    {
                        authorSingle.image ? <img className='rounded-[20px]' src={'http://localhost:5000/' + authorSingle.image} width={505} height={600} alt="" /> : <div className='w-[505px] h-[600px] bg-gray-500 rounded-[20px]'>

                        </div>
                    }
                </li>
                <li className='w-[672px] '>
                    <h3 className='author-page-name text-start'>
                        {authorSingle.first_name ? authorSingle.first_name + " " + authorSingle.last_name : <span className='block w-[400px] mb-[10px] p-[20px] bg-gray-500 rounded-[10px]'></span>}
                    </h3>
                    <div className='w-[671px]'>
                        <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.80) " : "rgba(13, 13, 13, 0.80)" }} className='author-page-desc break-normal mb-[44px]'>
                            {authorSingle.bio ? authorSingle.bio : <span className='block w-[670px] p-[20px] bg-gray-500 rounded-[10px]'></span>}
                        </p>
                    </div>
                    <ul className='flex items-center justify-start gap-[16px]'>
                        <li>
                            <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.80) " : "rgba(13, 13, 13, 0.80)" }} className='author-page-desc-tugilganyil'>
                                {authorSingle.date_of_birth ?
                                    t("AuthorSinglePage.tugilgan_yili") : <span className='block w-[250px] p-[20px] bg-gray-500 mb-[10px] rounded-[10px]'></span>}
                            </p>
                            <time className='author-page-yil'>
                                {authorSingle.date_of_birth ? authorSingle.date_of_birth : <span className='block w-[200px] p-[20px] bg-gray-500 mb-[10px] rounded-[10px]'></span>}
                            </time>
                            <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.80) " : "rgba(13, 13, 13, 0.80)" }} className='author-page-location'>
                                {authorSingle.country}
                            </p>
                        </li>
                        <li>
                            <span className='author-page-line'>
                                -
                            </span>
                        </li>
                        <li>
                            <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.80) " : "rgba(13, 13, 13, 0.80)" }} className='author-page-desc-tugilganyil'>
                                {authorSingle.date_of_birth ? t("AuthorSinglePage.vafot_etgan_yili") : <span className='block w-[250px] p-[20px] bg-gray-500 mb-[10px] rounded-[10px]'></span>}
                            </p>
                            <time className='author-page-yil'>
                                {authorSingle.date_of_death ? authorSingle.date_of_death : <span className='block w-[200px] p-[20px] bg-gray-500 rounded-[10px]'></span>}
                            </time>
                            <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.80) " : "rgba(13, 13, 13, 0.80)" }} className='author-page-location'>
                                {authorSingle.country}
                            </p>
                        </li>

                    </ul>
                </li>
            </ul>
            <div className='author-page-asarlar pb-[20px]'>
                <div className='flex justify-between items-center'>
                    <strong className='text-[#C9AC8C] text-[31px]'>{t("AuthorSinglePage.asarlari")}</strong>
                    <button style={{ color: DarkMode ? "rgba(255, 255, 255, 0.80) ": "rgba(13, 13, 13, 0.80)" }} className='rounded-none border-none outline-none  text-[16px]'>{t("AuthorSinglePage.barchasini_korish")}</button>
                </div>
                <AuthorSinglePageList name={name} authorSingle={authorSingle} />


            </div>
        </div>
    )
}

export default AuthorSinglePages