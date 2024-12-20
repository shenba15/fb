import React, { useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { handleprofile,handlesign,handlesignpassboo,handlesigntolog } from '../Slice.js'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useEffect } from 'react'

const Login=()=>{
    let state=useSelector((e)=>e)
    let dispatch=useDispatch()
    let [name,setname]=useState('')
    let [surname,setsurname]=useState('')
    let [email,setemail]=useState('')
    let [pass,setpass]=useState('')
    let [gen,setgen]=useState('')
    let [localstore,setlo]=useState()
    var formdata

    let handle=(e)=>{
        if(e.target.name==='name'){
            setname(e.target.value)
            // console.log(e.target.value)
            dispatch(handleprofile(e.target.value))
        }
        else if (e.target.name==='surname'){
            setsurname(e.target.value)
        }
        else if (e.target.name==='email'){
            setemail(e.target.value)
        }
        else if (e.target.name==='pass'){
            setpass(e.target.value)
        }
        else if(e.target.name==='gen'){
            setgen('on')
            // console.log(e.target.value)
        }
    }
    useEffect(()=>{
        setlo(JSON.parse(localStorage.getItem('formdata')))

    },[])

    let sign=()=>{
        dispatch(handlesign(true))
        if(name!='' && surname!="" &&  email!='' && pass!='' && gen!=''){
            // console.log('hello local')
            console.log(pass.length,email.length);
            if(pass.length>=8 && email.length===10){
                 formdata={
                    name,pass,phone:email
                }
                // console.log('hello local next')
                storedata(formdata)
                checking(formdata)
                
            }
        }
    }

    let storedata=(formdata)=>{
       let storeform=JSON.parse(localStorage.getItem('formdata'))||[]
        storeform.push(formdata)
        console.log(name);
        localStorage.setItem('formdata',JSON.stringify(storeform))
        console.log(JSON.parse(localStorage.getItem('formdata')));
        let x=(JSON.parse(localStorage.getItem('formdata')))
        setlo(x)
        console.log(x);
    }

    let checking=(formdata)=>{
        dispatch(handlesigntolog(true)) 
        formdata={
            name,pass,phone:email
        }
        localstore?.map((e)=>{
            // console.log(localstore);
           return e.name===formdata.name?alert("This name is already exit, Please enter different name"):''
        })
        localstore?.map((e)=>{
            // console.log(e.name,name);
           if(e.name===name){
            dispatch(handlesigntolog(false)) 
        }
        })
        let same=localstore?.find((e)=>{
            return e.name===name
         })
         console.log(same);
        let x=localstore?.map((e)=>{
            return e.name===name? "":e
         })
        console.log(x)
        if(x!==undefined){
           if(same===undefined){
            x.push(formdata)
           }
           else{
            x.push(same)
           }
        }
       if(x!==undefined){
        let y= localStorage.setItem('formdata',JSON.stringify(x))
        setlo(y)
       }
        setname('')
        setsurname('')
        setemail('')
        setpass('')
        setgen('')
        dispatch(handlesign(false))
        
    }
    let view=()=>{
        dispatch(handlesignpassboo(!state.data.signpassboo))
    }
  
    return <section id='logsection'>
    
    <div id="container">
        <div id="row1">
            <h3>SIGN UP</h3>
            <h4 id='head'>if's quick and easy.</h4><hr/>

        </div>

        <div id="row2">
            <div id="col1">
                <input type="text"name='name' onChange={handle} value={name} id='col1input' placeholder="First name"/>
                <input type="text" name='surname' value={surname} onChange={handle} placeholder="Surname"/>

            </div><br/>
            <div>{state.data.signup?name==='' || surname===''?<p className='error'>Please Enter this field</p>:'':''}</div>
            <div id="col2">
                <input type="text" value={email}  onChange={handle} name='email' id="email" placeholder="Mobile Number"/><br/><br/>
                 <div>{state.data.signup?email===''?
                 <p className='error'>Please Enter your Mobile number</p>:email.length===10?
                 '':<p className='error'>Phone must be 10 character</p>:''}</div>
               {
                state.data.signpassboo? <div className='passeye'><input  onChange={handle} value={pass} name='pass' type="text" id="pass" placeholder="New password"/><FaEyeSlash onClick={view} className='eye'/></div>:<div  className='passeye'> <input  type="password" onChange={handle} value={pass} name='pass' id="pass" placeholder="New password"/><IoEyeSharp onClick={view}  className='eye'/></div>
               }<br/><br/>
                 <div>{state.data.signup?pass===''?<p className='error'>Please Enter your password</p>:pass.length<8?
                 <p className='error'>password Must have 8 character</p>:'':''}</div>


            </div>
           
            <div id="col3">
                <h5 id='head5'>Date of birth <span>?</span></h5>
                <select className='sel' >
                    {state.data.logdate.map((e,i)=>{
                        return  <option value={e} key={i}>{e}</option>
                       
                    })}
                </select>

                <select className='sel' >
                {state.data.logmonth.map((e,i)=>{
                        return  <option value={e} key={i}>{e}</option>
                       
                    })}
                    
                </select>

                <select  >
                {state.data.logyear.map((e,i)=>{
                        return  <option key={i} value={e}>{e}</option>     
                    })}
                </select>
            </div>
            <h5 id='head5'>Gender <span>?</span></h5>

            <div id="col4">
                
                <div>
                    <p>Female</p>
                     <input id="fe" type="radio" value={gen} name="gen" onChange={handle}/>
                </div>

                <div>
                    <p>Male</p>
                     <input id="ma" type="radio" name="gen" value={gen}  onChange={handle}/>
                </div>

                <div>
                    <p>Custom</p>
                     <input id="cu" type="radio" name="gen" value={gen}  onChange={handle}/>
                </div>
            </div><br/>
            <div>{state.data.signup?gen===''?<p className='error'>Please Choose your Gender</p>:'':''}</div>

            <div className="para">
                <p >People who use but our services may have uploaded your contact information to Facebook.<br></br> <span><a className='more'>Learn more</a></span></p>
            </div>
            

            <div  className="para">
                <p className='logpara'>By clicking Sign Up, you agree  to our <span><a className='more'> Terms Privacy Policy </a></span> and <a className='more'>Cookies policy</a><br/>
                You may receive SMS notification form us and can opt out at any time </p>
            </div>
            <div id="signbtn">
                <input type="submit" value="Sign Up" onClick={sign}/>
            </div>
            {/* <div id="acc">
                <span><a>Already have an account ?</a></span>
            </div> */}

        </div>

    </div>
    
</section>
}

export default Login