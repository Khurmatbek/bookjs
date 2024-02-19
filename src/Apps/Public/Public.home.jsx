import React from 'react'
import temuriy_img from "../.././assets/temuriylar.png"
const PublicHome = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="main-wrapper pt-[100px] flex items-center justify-between">
                    <div className="">
                        <img className="blur-1 p-2 rounded-xl  bg-[#C9AC8C]" src={temuriy_img} width={600} height={600} alt=" book " />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <h2 className="janr text-[50px]" >Temuriylar davri</h2>
                        <h2 className="janr text-[50px]" >Jadidlar adabiyoti</h2>
                        <h2 className="janr text-[50px]" >Sovet davri</h2>
                        <h2 className="janr text-[50px]" >Mustaqillik davri</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PublicHome