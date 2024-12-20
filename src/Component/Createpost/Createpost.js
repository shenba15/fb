import React, { useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import {handlebox, handledefaultpost, handleid } from '../Slice.js';
import { BiImageAdd } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import './Createpost.css'
const Createpost = () => {
    let [caption, setcaption] = useState('')
    let state = useSelector((e) => e)
    let a=useNavigate()
    let dispatch = useDispatch()
    var inputRef = useRef(null)
    var [image,setimage]=useState('')
    const imagepost = () => {
        console.log('hello');
        inputRef.current.click()
    }
    var like = ['Hashini, APTA, Durga and ', 'Akilan , Ananthi, Sri and ', 'Btsarmy, kayal, durga and ', 'Anu, Santhi, Hrithik and']
    // var likecount = [31, 44, 7, 86, 77, 23]
    var file
    let handle=(e)=>{
        file = e.target.files[0]
        console.log(e.target.files[0]);
        setimage(file)
    }
    let post = () => {
        console.log(Math.random() * like.length);
        var id = state.data.id
        var post = {
            name: state.data.profile,
            id: id,
            dpurl: "https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg",
            url:image,
            // like: like[Math.floor(Math.random() * like.length)],
            // likecount: likecount[Math.floor(Math.random() * likecount.length)],
            likecount:0,
            boo: false,
            caption: caption,
            comboo: false,
            deleteboo: false,
            day: "Just Now",
            comment: []
        }
        let x = state.data.defaultpost.map((e) => {
            return e
        })
        x.push(post)
        dispatch(handledefaultpost(x))
        console.log(x)
        setcaption('')
        setimage('')
        dispatch(handleid((state.data.id)+1))
        dispatch(handlebox(false))
    }
    let handlecap = (e) => {
        if (e.target.name === 'cap') {
            setcaption(e.target.value)
        }
    }
    return <section className='createpost'>
        <div className='create'>
            <h3>Create post</h3>
            <div><RxCross2 className='cancel'/></div>
        </div>
        <hr/>
        <div className='home1col'>
            <div className="home1img"><img src="https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg" /></div>
            <p>{state.data.profile}</p>

            {/* <div id='pimage'>  <div onClick={imagepost}><IoIosImages className='file' /><input type='file' className='fileinput' ref={inputRef} name='file' onChange={handle} /></div></div> */}
        </div>
        <div className='createinput'> <input type='text' onChange={handlecap} name='cap' value={caption} id='input' placeholder={`whats on your mind, ${state.data.profile}?`} /></div>
        <div className='createimage'>
            {
                image?
                image.type === 'video/mp4' || image.type === 'video/mp3' || image.type === 'video/mov' ?
                 <div   className='createimg' ><video>
                                                <source src={URL.createObjectURL(image)} type="video/mp3" />
                                                <source src={URL.createObjectURL(image)} type="video/mp4" />
                                                <source src={URL.createObjectURL(image)} type="video/mov" />
                                            </video>
                </div>:<div className='createimg'><img src={URL.createObjectURL(image)} /> </div>:
               <div   className='createimg'> <div><BiImageAdd className='postimg' onClick={imagepost}/></div>
               <h4>Add photos/videos</h4>
               <h6>or drag and trop</h6></div>
            }
            <input type='file' className='fileinput' ref={inputRef} name='file'  onChange={handle} style={{display:"none"}}/>

        </div>
        <div style={{margin:"10px 0px"}}>
            {image?<p style={{backgroundColor:"blue", padding:"10px", color:"white",textAlign:"center"}} onClick={post}>Post</p>:<p style={{padding:"10px",textAlign:"center",backgroundColor:"#b2bac5",}}>post</p>}
        </div>
    </section>

}
export default Createpost