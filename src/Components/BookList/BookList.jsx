import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { BookContext } from '../../Context/BookContext';
import { useLocation } from 'react-router-dom';
import BookCards from '../../Components/BookCards/BookCards'
import { TokenContext } from '../../Context/TokenContext';
const BookList = () => {
    const {token, setToken}=useContext(TokenContext)
    const genredata = {
        "/kitoblar": 1,
        "/kitoblar/jadid": 2,
        "/kitoblar/sovet": 3,
        "/kitoblar/mustaqillik": 4
    }
    const location = useLocation();
    const { bookinfo, setBookinfo } = useContext(BookContext);
    useEffect(() => {
        axios.get(`http://localhost:5000/book/genreId/${genredata[location.pathname]}`, {
            headers: token,
        }
        )
            .then(res => {
                if (res.status === 201) {
                    setBookinfo(res.data)
                }
            })
    }, [location.pathname])
    return (
        <ul className='flex flex-wrap gap-[20px] justify-center '>
            {
                bookinfo.map(item => <BookCards key={item.id} item={item} />)
            }
        </ul>
    )
}

export default BookList