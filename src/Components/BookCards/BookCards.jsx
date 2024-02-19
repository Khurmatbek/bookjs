import React, { useContext, useState } from 'react'
import dunyoningIshlariImg from "../../../public/dunyoningishlari.svg"
import "./BookCards.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TokenContext } from '../../Context/TokenContext'
import { DarkContext } from '../../Context/DarkContext'
const BookCards = ({ item }) => {
    const [authorname, setAuthorname] = useState("");
    const { token } = useContext(TokenContext)
    const { DarkMode, setDarkMode } = useContext(DarkContext);
    axios.get(`http://localhost:5000/author/authorId/${item.author_id}`, {
        headers: {
            Authorization: token
        }
    }).then(res => {
        if (res.status === 201) {
            setAuthorname(res.data.first_name + " " + res.data.last_name)
        }
    })
    return (
        <li className='pt-[22px] rounded-xl'>
            <Link to={`book/${item.id}`} className='rounded-xl'>
                <div className='w-[190px] h-[283px] overflow-hidden mb-[12px] rounded-xl '>
                    <img className='rounded-xl' src={'http://localhost:5000/' + item.image} width={190} height={283} alt="book author" />
                </div>
                <strong style={{ color: DarkMode ? "#C9AC8C" : "black" }} className='books-name mb-[6px]'>
                    {item.title}
                </strong>
                <p style={{ color: DarkMode ? "rgba(255, 255, 255, 0.60)" : "rgba(13, 13, 13, 0.60)"}} className='books-author'>
                {authorname}
            </p>
        </Link>
        </li >
    )
}

export default BookCards