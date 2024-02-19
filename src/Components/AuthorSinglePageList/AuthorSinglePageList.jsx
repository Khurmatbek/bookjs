import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext'
import "./AuthorSingleList.css"
import { DarkContext } from '../../Context/DarkContext'



const AuthorSinglePageList = ({ name, authorSingle }) => {
    const [authorbooks, setAuthorBooks] = useState([]);
    const { DarkMode, setDarkMode } = useContext(DarkContext);
    const { token } = useContext(TokenContext)
    useEffect(() => {
        axios.get("http://localhost:5000/author/books/" + Number(name), {
            headers: {
                Authorization: token
            }
        }
        ).then(res => {
            if (res.status === 201) {
                setAuthorBooks(res.data)
            }
        })
    }, [name])

    return (
        <ul className='overflow-x-scroll author-books-list'>
            {
                authorbooks.map((item, index) => {
                    return (
                        <li key={index} className='rounded-[15px] flex flex-col gap-[10px]'>
                            <div className='w-[190] h-[283px] overflow-hidden rounded-[15px]'  >
                                <img src={"http://localhost:5000/" + item.image}
                                    width={190}
                                    height={283}
                                    alt="author books"
                                    className='rounded-[15px]'

                                />
                            </div>
                            <p style={{ color: DarkMode ? "#C9AC8C" : "#000000" }} className='text-[18px] text-[#C9AC8C]'>
                                {item.title}
                            </p>
                            <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.60)" :"rgba(13, 13, 13, 0.60)"}} className='text-[16px] text-[#FFF] opacity-60'>
                                {authorSingle.first_name + authorSingle.last_name}
                            </p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default AuthorSinglePageList