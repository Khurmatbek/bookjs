import React, { useContext, useRef } from 'react'
import { useState } from 'react';
// import i18n from '../../I18next';
import { useTranslation } from "react-i18next"
import i18n from "../../I18next"
import { DarkContext } from '../../Context/DarkContext';
import { useNavigate } from 'react-router-dom';

const SiteSettings = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(localStorage.getItem("lang") || "en",);
    const { DarkMode, setDarkMode } = useContext(DarkContext)
    const { t, i18n } = useTranslation();
    const checkChange = useRef();

    const [check, setCheck] = useState(false)
    const lang = useRef();
    const Changesave = (e) => {
        e.preventDefault()
        i18n.changeLanguage(lang.current.value)
        setState(lang.current.value),
            // setDarkMode(DarkMode)
            setDarkMode(checkChange.current.checked)
        localStorage.setItem("lang", lang.current.value)
        localStorage.setItem("dark", checkChange.current.checked)
        navigate("/")

    }
    return (
        <div className="flex flex-col justify-center items-center">
            <h3 style={{ color: DarkMode ? "#FFFFFF" : "#212121" }} className='text-[18px]'>
                {
                    t("Settings.Title")
                }
            </h3>
            <form className='flex flex-col w-[708px]' onSubmit={(e) => Changesave(e)} >
                <label style={{ color: DarkMode ? "#FFFFFF" : "#212121" }} className='flex p-[10px] flex-col gap-[10px] mb-[13px]' >
                    {t("Settings.language")}
                    <select className='outline-none text-black text-[14px] px-[20px] appearance-auto bg-[#F3F6F9] py-[12px] rounded-md
                    ' name="langechange" ref={lang} defaultValue={localStorage.getItem("lang") || "en"} >
                        <option value="en">English</option>
                        <option value="uz">Uzbek</option>
                        <option value="ru">Russia</option>
                    </select>
                </label>
                <label style={{ color: DarkMode ? "#FFFFFF" : "#212121" }} htmlFor="thema" className='text-[white]
            
                mb-[15px]'  >
                    {t("Settings.thema")}
                    <input type="checkbox" ref={checkChange} onClick={(e) => {
                        setCheck(e.target.checked)
                    }} id="thema" className='hidden' />
                    <div style={{
                        backgroundColor: check ? "#F4F6F9":"black"
                    }} className='w-[90px] mt-2 px-2 py-1 bg-blue-300  flex justify-start items-center rounded-full'>
                        <span style={{
                            marginLeft: check ? "auto" : "",
                            backgroundColor: check ? "black" : "white"
                        }} className='w-[30px] h-[30px]  block bg-red-600 rounded-full'></span>
                    </div>
                </label>
                <button style={{
                    color: DarkMode ? "black" : "white",
                    background: DarkMode ? "#F1F6FF" : "#152540"

                }} className='ml-auto w-[182px] py-[12px]'>
                    {
                        t("Settings.save_changes")
                    }
                </button>

            </form>
        </div>
    )
}

export default SiteSettings