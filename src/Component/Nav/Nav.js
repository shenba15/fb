import React from "react";
import './Nav.css'

import { FaSearch, FaFacebookMessenger } from 'react-icons/fa'
import { IoMdHome, IoMdPeople } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
import { TbBellFilled } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { CiShop } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { handleview } from "../Slice.js";


const Nav = () => {
    let icons = [<CgMenuGridR />, <FaFacebookMessenger />, < TbBellFilled />]
    let icon = [<IoMdPeople />,<FaFacebookMessenger />,<RiComputerLine/>, < TbBellFilled />,<CiShop/>]
   
    let state=useSelector((e)=>e)
    let dispatch=useDispatch()
    let viewmore=()=>{
        dispatch(handleview(!state.data.view))
    }

    return <section id='facebook'>
        {/* labsection */}
        
        <section className="lnavsection">
            <div className="lnavcontainer">
                <div className="lnavrow">
                    <div className="lnavcol1">
                        <div className="logo">
                            <img src="https://images.hindustantimes.com/tech/img/2023/09/21/960x540/fb_1695273515215_1695273522698.jpg" />
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Search Facebook" />
                            <FaSearch id="search" />
                        </div>

                    </div>
                    <div className="lnavcol2">
                        <div >
                            < IoMdHome className="selecthome" />
                            <div className="select"></div>
                        </div>
                        <div><IoMdPeople /></div>
                        <div><HiUserGroup /></div>

                    </div>
                    <div className="lnavcol3">
                        <div className="frd">Find friends</div>
                        {
                            icons.map((e, i) => {
                                return <div key={i} className="navicons">{e}</div>
                            })
                        }
                        <div className="dp" onClick={viewmore}><img src="https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg" /></div>

                    </div>


                </div>

            </div>

        </section>

        <section className="mnavsec">
            <div className="mnavcontainer">
                <div className="mnavrow1">
                        <div className="logo">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5PzLcatn2DfuEWKy29cqsa3J_5kjDQLpnBbwWOZM0642eMYzwfQ8ZbCttPsmXb2DOUz4&usqp=CAU" />
                        </div>
                        <div className="msearch">
                            {/* <input type="text" placeholder="Search Facebook" /> */}
                            <FaSearch className='msear'/>
                        </div>
                        <div className="msearch" onClick={viewmore}><IoMenu className='msear'/></div>
                </div>

            </div>
            <div className="mnavrow2">
                <div className="micons" id='home' ><IoMdHome /></div>
                {
                    icon.map((e,i)=>{
                        return <div key={i} className="micons">{e}</div>
                    })
                }

            </div>

        </section>
       
    </section>
}
export default Nav