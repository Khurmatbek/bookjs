import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import 'react-dropdown/style.css';
import Example from "../../Components/Dropdown/Drop"
import Courusel from '../../Components/Corusel/Corusel';
import { IoSearch } from "react-icons/io5";
import "./Private.css"
import avloniy_img from "../../../public/avloniy.png"
import bg_item_img from "../../../public/bg-item-1.svg"
import bg_item_img_sec from "../../../public/bg-item-2.svg"
import AuthorCards from '../../Components/AuthorCards/AuthorCards';
import BookCards from '../../Components/BookCards/BookCards';
import { AuthorList } from '../../Components/AuthorList/AuthorList';
import DropDownNavbar from '../../Components/Dropdown/Drop';
import AuthorSinglePages from '../../Pages/AuthorSinglePage/AuthorSinglePages';
import BookSinglePage from '../../Pages/BookSinglePages/BookSinglePage';
import axios from 'axios';
import { AuthorContext } from '../../Context/AuthorContext';
import BookList from '../../Components/BookList/BookList';
import { useTranslation } from 'react-i18next';
import { DarkContext } from '../../Context/DarkContext';
import { color } from 'framer-motion';
import bg_light from "../../../public/bg-light.svg"
import { BookContext } from '../../Context/BookContext';
const Private_home = () => {
    const { DarkMode, setDarkMode } = useContext(DarkContext);
    const { t, i18n } = useTranslation();
    const { authorinfo, setAuthorinfo } = useContext(AuthorContext);
    const { bookinfo, setBookinfo } = useContext(BookContext);

    const searchValue = useRef()
    const searchbook = useRef();
    const [value, setValue] = useState("")
    const location = useLocation();
    const handleAuthor = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/author/search?author=${searchValue.current.value}`)
            .then(res =>
                setAuthorinfo(res.data)
            )
    }
    const handleBook = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/book/search?book=${searchbook.current.value}`)
            .then(res =>
                setBookinfo(res.data)
            )
    }

    return (
        <div className='min-h-screen h-full' style={{
            backgroundColor: DarkMode ? "#191919" : "white",
            color: DarkMode ? "white" : "#121212",
            backgroundAttachment: "fixed"

        }}>
            <header className='site-header'>
                <div className="container">
                    <div className="wrapper flex  justify-between item-center pt-[32.5px] pb-[32.5px]">
                        <Link className='text-[25px]' to={"/"} style={{
                            color: DarkMode ? "#C9AC8C" : "#C9AC8C"
                        }}>
                            {
                                t("homePage.header.logo")
                            }
                        </Link>
                        <nav>
                            <ul className='flex item-center gap-[22px] '>
                                <li>
                                    <NavLink style={() => {
                                        const isActive = location.pathname === "/" || location.pathname === "/jadid" || location.pathname === "/sovet" || location.pathname === "/mustaqillik"
                                        return isActive ? { color: "#fff", opacity: "1" } : { color: "white", opacity: "0.5" };
                                    }} to={"/"} className={DarkMode ? "dark-nav" : "light-nav"} >
                                        {
                                            t("homePage.header.Home")
                                        }
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/kitoblar"} style={({ isActive }) => {
                                        return isActive ? { color: "#fff", opacity: "1" } : { color: "white", opacity: "0.5" };
                                    }} className={DarkMode ? "dark-nav" : "light-nav"}>
                                        {t("homePage.header.books")}
                                    </NavLink>
                                </li>
                                <li>
                                    <DropDownNavbar />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <main className={DarkMode ? "dark-main bg-[#191919]" : "light-main bg-[#fff]"}>
                <div className="container">
                    <Routes>
                        <Route path='/*' element={
                            (
                                <div className="wrapper relative">
                                    <Courusel />
                                    <div className={!DarkMode ? 'bg-[#FFF] w-[1040px] py-[29px] px-[73px]  absolute top-[270px] left-[100px] rounded-2xl shadow-[0_4px_77px_0_rgba(0,0,0,0.25)] z-10 '
                                        : 'w-[1040px] py-[29px] px-[73px] bg-[#191919] absolute top-[270px] left-[100px] rounded-2xl shadow-[0_4px_77px_0_rgba(0,0,0,0.25)] z-10 '} >
                                        <h3 className='search-title mb-[10px]'>
                                            {
                                                t("homePage.main.searchTitle")
                                            }</h3>
                                        <form className='flex items-center gap-[14px]' onSubmit={(e) => {
                                            handleAuthor(e)

                                        }} >
                                            <input ref={searchValue} style={
                                                { background: DarkMode ? "#404040" : "#F5F5F5" }
                                            } className='w-[710px] py-[12px] px-[27px] text-[white]  bg-[#404040] border-0 outline-none placeholder:text-[16px] placeholder:font-[Poppins]' placeholder={t("homePage.main.inputPlaceholder")} type='search' />
                                            <button
                                                style={{ color: DarkMode ? "black" : "#EFDAC3" }}
                                                className='py-[12px] px-[37px] flex gap-1 items-center bg-[#C9AC8C] rounded-2xl'><IoSearch /> {t("homePage.main.searchTitle")} </button>
                                        </form>
                                    </div>
                                    <div  >
                                        <h4 className='category-title mb-[23px]'>
                                            {
                                                t("homePage.main.categorysTitle")
                                            }
                                        </h4>
                                        <ul className='flex text-center w-full justify-center gap-[34px] '>
                                            <li className='p-[10px]'>
                                                <NavLink to={"/"} style={({ isActive }) => {
                                                    return isActive ? { color: "#C9AC8C", opacity: "1" } : {}
                                                }} className={DarkMode ? "category-temuriy " : "text-[#0D0D0D99] opacity-60"}>
                                                    {t("homePage.main.category1")}
                                                </NavLink>
                                            </li>
                                            <li className='p-[10px]'>
                                                <NavLink to={"/jadid"} style={({ isActive }) => {
                                                    return isActive ? { color: "#C9AC8C", opacity: "1" } : {}
                                                }} className={DarkMode ? "category-temuriy " : "text-[#0D0D0D99] opacity-60"}>
                                                    {t("homePage.main.category2")}
                                                </NavLink>
                                            </li>
                                            <li className='p-[10px]'>
                                                <NavLink to={"/sovet"} style={({ isActive }) => {
                                                    return isActive ? { color: "#C9AC8C", opacity: "1" } : {}
                                                }} className={DarkMode ? "category-temuriy " : "text-[#0D0D0D99] opacity-60"}>
                                                    {t("homePage.main.category3")}
                                                </NavLink>
                                            </li>
                                            <li className='p-[10px]'>
                                                <NavLink to={"/mustaqillik"} style={({ isActive }) => {
                                                    return isActive ? { color: "#C9AC8C", opacity: "1" } : {}
                                                }} className={DarkMode ? "category-temuriy " : "text-[#0D0D0D99] opacity-60"}>
                                                    {t("homePage.main.category4")}
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <div>

                                            <Routes>
                                                <Route index element={<AuthorList />} />
                                                <Route path='jadid' element={<AuthorList />} />
                                                <Route path='sovet' element={<AuthorList />} />
                                                <Route path='mustaqillik' element={<AuthorList />} />
                                            </Routes>

                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                        < Route path='/kitoblar/*' element={(
                            <div>
                                <div className="wrapper relative">
                                    <Courusel />
                                    <div className={DarkMode ? "w-[1040px] py-[29px] px-[73px] bg-[#191919] absolute top-[270px] left-[100px] rounded-2xl shadow-[0_4px_77px_0_rgba(0,0,0,0.25)] z-10" : 'w-[1040px] py-[29px] px-[73px] bg-[#FFF] absolute top-[270px] left-[100px] rounded-2xl shadow-[0_4px_77px_0_rgba(0,0,0,0.25)] z-10 '} >
                                        <h3 className='search-title mb-[10px]'>{t("homePage.main.searchTitle")}</h3>
                                        <form onSubmit={(e) => handleBook(e)} className='flex items-center gap-[14px]' >
                                            <input ref={searchbook} style={{
                                                background: DarkMode ? "#404040" : "#F5F5F5"

                                            }} className='w-[710px] py-[12px] px-[27px] text-[white]  bg-[#404040] border-0 outline-none placeholder:text-[16px] placeholder:font-[Poppins]' placeholder={t("homePage.main.inputPlaceholder")} type='search' />
                                            <button
                                                style={{
                                                    color: DarkMode ? "#3C2710" : "#EFDAC3"
                                                }}
                                                className='py-[12px] px-[37px] flex gap-1 items-center bg-[#C9AC8C] rounded-2xl'><IoSearch />
                                                {
                                                    t("homePage.main.searchTitle")
                                                }
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div  >
                                    <h4 className='category-title mb-[23px]'>
                                        {t("homePage.main.categorysTitle")}
                                    </h4>
                                    <ul className='flex text-center w-full justify-center gap-[34px] '>
                                        <li className='p-[10px]'>
                                            <NavLink to={"/kitoblar"} style={({ }) => {
                                                const isActive = "/kitoblar" === location.pathname
                                                return isActive ? { color: "#C9AC8C" } : {}
                                            }} className={DarkMode ? "category-temuriy" : "category-temuriy-light"}>
                                                {t("homePage.main.category1")}
                                            </NavLink>
                                        </li>
                                        <li className='p-[10px]'>
                                            <NavLink to={"jadid"} style={({ isActive }) => {
                                                return isActive ? { color: "#C9AC8C" } : {}
                                            }} className={DarkMode ? "category-temuriy" : "category-temuriy-light"}>
                                                {t("homePage.main.category2")}
                                            </NavLink>
                                        </li>
                                        <li className='p-[10px]'>
                                            <NavLink to={"sovet"} style={({ isActive }) => {
                                                return isActive ? { color: "#C9AC8C" } : {}
                                            }} className={DarkMode ? "category-temuriy" : "category-temuriy-light"}>
                                                {t("homePage.main.category3")}
                                            </NavLink>
                                        </li>
                                        <li className='p-[10px]'>
                                            <NavLink to={"mustaqillik"} style={({ isActive }) => {
                                                return isActive ? { color: "#C9AC8C" } : {}
                                            }} className={DarkMode ? "category-temuriy" : "category-temuriy-light"}>
                                                {t("homePage.main.category4")}
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <div>
                                        <ul className='flex flex-wrap gap-[20px] justify-center '>
                                            <Routes>
                                                <Route index element={<BookList />} />
                                                <Route path='jadid' element={<BookList />} />
                                                <Route path='sovet' element={<BookList />} />
                                                <Route path='mustaqillik' element={<BookList />} />
                                            </Routes>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        )} />
                        <Route path='/author/:name' element={<AuthorSinglePages />} />
                        <Route path='sovet/author/:name' element={<AuthorSinglePages />} />
                        <Route path='jadid/author/:name' element={<AuthorSinglePages />} />
                        <Route path='mustaqillik/author/:name' element={<AuthorSinglePages />} />
                        <Route path='kitoblar/book/:name' element={<BookSinglePage />} />
                        <Route path='/kitoblar/sovet/book/:name' element={<BookSinglePage />} />
                        <Route path='kitoblar/jadid/book/:name' element={<BookSinglePage />} />
                        <Route path='mustaqillik/book/:name' element={<BookSinglePage />} />
                    </Routes>

                </div >
            </main >
        </div>

    )
}

export default Private_home
