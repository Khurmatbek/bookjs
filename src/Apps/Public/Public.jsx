
import { Link, Route, Routes, NavLink } from "react-router-dom"
import nature from "../../../public/bgnature.svg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import temuriy_img from "../.././assets/temuriylar.png"
import 'swiper/css';
import "./public.css"
import PublicHome from "./Public.home";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import { color } from "framer-motion";
import { useContext } from "react";
import { DarkContext } from "../../Context/DarkContext";
const Public = () => {
    const {DarkMode}=useContext(DarkContext)
    return (
        <div style={{
            background: DarkMode ?"191919":"#FFF"
        }} className="h-screen overflow-hidden ">
            <header className="public-header py-[32.5px]">
                <div className="container">
                    <div className="wrapper flex items-center justify-between">
                        <Link to={"/"} className="site-logo">
                            Badiiyat
                        </Link>
                        <nav >
                            <ul className="flex gap-[30px] ">
                                <li>
                                    <NavLink  style={({ isActive }) => {
                                        return isActive ? { color: "#C9AC8C" } : {};
                                    }} className={DarkMode?"text-[#f5f5f5]":"login text-[#191919]"} to={"/login"}>
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink style={({ isActive }) => {
                                        return isActive ? { color: "#C9AC8C" } : {};
                                    }} className={DarkMode ? "text-[#f5f5f5]" : "register text-[#191919]"} to={"/register"}>
                                        Register
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header >
            <main className="flex flex-col justify-start ">
                <Routes>
                    <Route path={"/"} element={<PublicHome />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path={"/login"} element={<Login />} />
                </Routes>
            </main>
        </div >
    )
}
export default Public