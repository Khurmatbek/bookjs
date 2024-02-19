import React, { useContext } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import "./Settings.css"
import Profiles from '../../../Pages/Profiles/Profiles'
import Security from '../../../Pages/Security/Security'
import SiteSettings from '../../../Pages/SiteSettings/SiteSettings'
import { useTranslation } from 'react-i18next'
import { DarkContext } from '../../../Context/DarkContext'
const Settings = () => {
    const { t, i18n } = useTranslation();
    const { name } = useParams();
    const location = useLocation()
    const { DarkMode, setDarkMode } = useContext(DarkContext)
    const isActive = location.pathname == "/profile";
    const spanActive = isActive ? " actives" : "";
    const spanActivesec = isActive ? " activessec" : "";
    return (
        <div style={{ background: DarkMode ? "#191919" :"#FFF"}} className='min-h-screen' >
            <header className='bg-[#2D2D2D]  mb-[83px]'>
                <ul className='flex header-settings-list items-center justify-between '>
                    <li className='w-[33.3%] header-settings-list-item'>
                        <NavLink to={"/profile"} className={DarkMode ? "flex  text-[white]   p-[23px] items-center justify-start gap-[8px]"
                            : 'flex text-[#464E5F]   p-[23px] items-center justify-start gap-[8px] bg-[#F3F6F9]'}
                            style={() => {
                                return DarkMode ? (isActive ? { background: "white", color: "black" } : {}) : (isActive ? { background: "#DDE6F5", color: "#152540" } : {})
                            }} >
                            <span className={DarkMode ? "settings-number-one dark w-[40px] flex flex-col items-center justify-center h-[40px] rounded  border-[2px] py-[6px] px-[12px] border-[#E5EAEE] text-[#E5EAEE]  text-[16px]" + spanActive
                                : 'settings-number-one-light w-[40px]   flex flex-col items-center justify-center h-[40px] rounded  border-[2px] py-[6px] px-[12px] border-[#E5EAEE] text-[#3699FF] bg-[#E5EAEE]  text-[16px]' + spanActivesec }

                            >
                                1
                            </span>
                            {t("Profile.header.Profile")}

                        </NavLink>
                    </li>
                    <li className='w-[33.3%] header-settings-list-item'>
                        <NavLink to={"security"} className={DarkMode ? "flex dark text-[white]   p-[23px] items-center justify-start gap-[8px]"
                            : 'flex text-[#464E5F]   p-[23px] items-center justify-start gap-[8px] bg-[#F3F6F9]'}
                            style={({ isActive }) => {
                                return DarkMode ? (isActive ? { background: "white", color: "black" } : {}) : (isActive ? { background: "#DDE6F5", color: "#152540" } : {})
                            }}
                        >
                            <span className={DarkMode ? "dark settings-number w-[40px] flex flex-col items-center justify-center h-[40px] rounded  border-[2px] p-[6px] border-[#E5EAEE] text-[#E5EAEE]  text-[16px] "
                                : ' light settings-number w-[40px] flex flex-col items-center justify-center h-[40px] rounded  border-[2px] p-[6px] border-[#E5EAEE] text-[#3699FF]  text-[16px]'}>
                                2
                            </span>
                            {t("Profile.header.Security")}

                        </NavLink>
                    </li>
                    <li className='w-[33.3%] header-settings-list-item'>
                        <NavLink to={"settings"} className={DarkMode ? "flex dark text-[white]   p-[23px] items-center justify-start gap-[8px]"
                            : 'flex text-[#464E5F] light  p-[23px] items-center justify-start gap-[8px] bg-[#F3F6F9]'}
                            style={({ isActive }) => {
                                return DarkMode ? (isActive ? { background: "white", color: "black" } : {}) : (isActive ? { background: "#DDE6F5", color: "#152540" } : {})
                            }}
                        >
                            <span className={DarkMode ? "dark settings-number w-[40px] flex flex-col items-center justify-center h-[40px] rounded  border-[2px] p-[6px] border-[#E5EAEE] text-[#E5EAEE]  text-[16px] "
                                : ' light settings-number w-[40px] flex flex-col items-center justify-center h-[40px] rounded  border-[2px] p-[6px] border-[#E5EAEE] text-[#3699FF]  text-[16px]'}>
                                3
                            </span>

                            {t("Profile.header.Settings")}

                        </NavLink>
                    </li>
                </ul>
            </header>
            <main>
                <div className="container">
                    <Routes>
                        <Route index element={<Profiles />} />
                        <Route path='security' element={<Security />} />
                        <Route path='settings' element={<SiteSettings />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default Settings