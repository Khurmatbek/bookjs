
import { Link, Router } from "react-router-dom"
import  nature from "../../../public/bgnature.svg"
import "./public.css"
const Public = () => {
    return (
        <div>
            <header className="public-header py-[32.5px]">
                <div className="container">
                    <div className="wrapper flex items-center justify-between">
                        <Link to={"/"} className="site-logo">
                            Badiiyat
                        </Link>
                        <nav className="">
                            <ul className="flex gap-[30px] ">
                                <li>
                                    <Link className="login" to={"/login"}>
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link className="register" to={"/register"}>
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                <section className="section">
                    <div className="container">
                        <div className="main-wrapper">
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Public