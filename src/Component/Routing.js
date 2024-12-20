import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login/Login.js"
import Mainlogin from "./Mainlogin/Mainlogin.js"
import { useSelector } from "react-redux"
import Nav from "./Nav/Nav.js"
// import "style.css"
import Createpost from "./Createpost/Createpost.js"
import Save from "./view/Save.js"
import Home from "./Home/Home.js"

const Routing=()=>{
    let state=useSelector((e)=>e)
    return <BrowserRouter>
      {
      state.data.signtolog?
      <Routes>
      <Route path="/" element={<Login/>}/> 
      </Routes>

      :    <Routes>
      <Route path="/" element={<Mainlogin/>}/> 
      <Route path="/nav" element={<div><Nav id="nav"/><Home/></div>}/>
      <Route path="/nav/nav" element={<div><Nav  id="nav"/><Home/></div>}/>
      <Route path="/save"  element={<div><Nav  id="nav"/><Save/></div>}/>     
   </Routes>
       }
    </BrowserRouter>

}

export default Routing