import React, { useContext, useEffect, useState } from 'react'
import AuthorCards from '../AuthorCards/AuthorCards'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { AuthorContext } from '../../Context/AuthorContext'

export const AuthorList = () => {
    const { authorinfo, setAuthorinfo } =useContext(AuthorContext)
    const genredata = {
        "/": 1,
        "/jadid": 2,
        "/sovet": 3,
        "/mustaqillik": 4
    }
    const location = useLocation()
    useEffect(() => {
        axios.get(`http://localhost:5000/author/genreId/${genredata[location.pathname]}`)
            .then((response) => {
                if (response.status === 201) {
                    setAuthorinfo(response.data)
                }
            }
            )
    }, [location.pathname])
    return (
        <ul className='flex flex-wrap gap-[20px] py-[20px] justify-center '>
            {
                authorinfo.map(item => <AuthorCards key={item.id} item={item} />)
            }
        </ul>
    )
}
