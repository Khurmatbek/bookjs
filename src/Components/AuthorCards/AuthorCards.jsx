import React, { useContext } from 'react'
import avloniy_img from "../../../public/avloniy.png"
import bg_item_img from "../../../public/bg-item-1.svg"
import bg_item_img_sec from "../../../public/bg-item-2.svg"
import bg_item_img_light from "../../../public/bg-item-1.svg"
import bg_item_img_sec_light from "../../../public/bg-item-2.svg"
import { Link } from 'react-router-dom'
import { DarkContext } from '../../Context/DarkContext'
const AuthorCards = ({ item }) => {
    const { DarkMode, setDarkMode } = useContext(DarkContext)
    return (
        <li className={DarkMode ? "w-[295px] rounded-[22px] overflow-hidden mb-[20px] bg-[#1E1E1E" : 'w-[295px] rounded-[22px] mb-[20px] bg-[#F5F5F5]'} data-id="1">
            <Link to={`author/${item.id}`} className='rounded-[22px] overflow-hidden'>
                <div className='w-[295px] rounded-t-[22px] h-[224px] overflow-hidden'>
                    <img src={`http://localhost:5000/` + item.image} width={295} height={224} alt="" />
                </div>
                <div className={DarkMode ? "author-info-box pl-[16px] pt-[12px] pb-[63px]": 'light-author-info-box pl-[16px] pt-[12px] pb-[63px] '}>
                    <h4 className={DarkMode ? "#C9AC8C" : 'author-name text-black'}>
                        {item.first_name + ' ' + item.last_name}
                    </h4>
                    <p className={DarkMode ? "text-[#FFFFFF99 ] opacity-60" : 'author-year text-black opacity-60'}>
                        {item.date_of_birth + ' - ' + item.date_of_death}
                    </p>
                </div>
            </Link>
        </li >
    )
}

export default AuthorCards