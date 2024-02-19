import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContext'
import "./BooksSingleList.css"
import { DarkContext } from '../../Context/DarkContext'


const BookSingleList = ({ id }) => {

    const [bookAuthorBooks, setBookAuthorBooks] = useState([]);
    const [booksauthor,setBookauthor]=useState({})
    const { token } = useContext(TokenContext)
    const { DarkMode, setDarkMode } = useContext(DarkContext);

    useEffect(() => {
        axios.get("http://localhost:5000/author/books/" + id, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 201) {
                setBookAuthorBooks(res.data)
            }
        })
    }, [id])
    useEffect(() => {
        axios.get("http://localhost:5000/author/authorId/" + id, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 201) {
                setBookauthor(res.data)
            }
        })
    }, [id])


    return (
        <ul className=' flex gap-[20px] overflow-x-scroll books-author-list'>
            {bookAuthorBooks.map(item => {
                return (<li key={item.id}>
                    <img src={"http://localhost:5000/" + item.image} className='w-[190px] h-[283px] rounded-[15px] mb-[10px]' alt="" />
                    <p style={{ color: DarkMode ? "#C9AC8C" :"#000000"}} className='text-[18px] text-[#C9AC8C] mb-[8px]'>
                        {item.title}
                    </p>
                    <p style={{ color: DarkMode ? "#C9AC8C" : "#000000" }}  className='text-[16p] text-[#FFF] opacity-60'>
                        {
                            booksauthor.first_name + booksauthor.last_name
                        }
                    </p>
                </li>)
            })}
        </ul>
    )
}

export default BookSingleList