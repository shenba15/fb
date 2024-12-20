import React, { useEffect, useState } from "react";
import './Mainlogin.css'
import { useDispatch, useSelector } from "react-redux";
import { handlelogpassboo, handleprofile, handlesign, handlesigntolog } from "../Slice.js";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Mainlogin=()=>{
    let dispatch=useDispatch()
    let a=useNavigate()
    let [localstore,setlocal]=useState()
    let state=useSelector((e)=>e)
    let [phone,setphone]=useState('')
    let [name,setname]=useState('')
    let [pass,setpass]=useState('')
    var boo1=false
    var boo2=false
    useEffect(()=>{
        setlocal(JSON.parse(localStorage.getItem('formdata')))
    },[])

    let handle=(e)=>{
        if (e.target.name==='phone'){
            setphone(e.target.value)
        }
        else if (e.target.name==='pass'){
            setpass(e.target.value)
        }

    }
    let sign=()=>{
        dispatch(handlesigntolog(true))
    }

    let login=()=>{
        dispatch(handlesign(true))
        if(phone!=='' && pass!==''){
            localstore?.some((e)=>{
               if(e.phone===phone){
                if(e.pass===pass){
                    setname(e.name)
                    boo1 = true
                }
                else{
                    boo2=true
                }
               }})
        }
        check()
    }
  let check=()=>{
    if(!boo1 && !boo2 ){
        alert('Incorrect Phone Number')
    }
    else  if(boo2){
        alert("incorrect Password")
    }
    else {
    //    console.log(localstore);
        localstore?.map((e)=>{
            console.log('hello')
          if(e.name===name){
            alert("Login successfull")
            a("/nav")
            dispatch(handlesign(false))
            dispatch(handleprofile(name))
           

          }
        })}
  }
  let view=()=>{
    dispatch(handlelogpassboo(!state.data.logpassboo))
}
    return <section id="loginsec">
    <h3 className="loginhead3">facebook</h3>
    <div id="container">
 <div id="row">
            <h4 className="loginhead4">Login</h4>
            <input type="text" name="phone" id="email" value={phone} onChange={handle} className='logininput' placeholder="Phone number"/><br/><br/>
            {state.data.signup?phone===''?
                 <p className='error'>Please Enter your Mobile number</p>:phone.length===10?
                 '':<p className='error'>Phone must be 10 character</p>:''}
            {
                state.data.logpassboo?<div className='passeye'><input type="text" name='pass' id="pass" value={pass} onChange={handle} className='logininput' placeholder="password"/><FaEyeSlash onClick={view} className='eye'/></div>:<div className='passeye'><input type="password" name='pass' id="pass" value={pass} onChange={handle} className='logininput' placeholder="password"/><IoEyeSharp onClick={view}  className='eye'/></div>
            }<br/><br/>
            <div>
                <input id="btn" onClick={login} type="button" className='logininput' value="Log in"/>
            </div>
            <h5 className="loginhead5" onClick={sign}>Create new Account</h5>
        </div>
    </div>
</section>
}
export default Mainlogin