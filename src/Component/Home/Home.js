import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { MdOutlineSentimentSatisfiedAlt } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import './Home.css'
import {  handlebox, handledefaultpost, handleid, handlesigntolog } from '../Slice.js';
import { useNavigate } from 'react-router-dom';
import { IoSettings } from "react-icons/io5";
import { RiFeedbackFill } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Createpost from '../Createpost/Createpost.js';
// import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}
const Home = () => {
    let state = useSelector((e) => e)
    let dispatch = useDispatch()
    let a=useNavigate()
    var [caption, setcaption] = useState('')
    var [comm,setcomm]=useState('')
    var inputRef=useRef(null)
  const handleOpen = (id) => {
    if(id===2){
    dispatch(handlebox(true))
}
  };
  const handleClose = () => {
    dispatch(handlebox(false))
  };

    let out=(id)=>{
        if(id===3){
            dispatch(handlesigntolog(false))
            a('/')
        }
    }
    const imagepost=()=>{
        console.log('hello');
        inputRef.current.click()
    }
    let logout=[
        {
        icon: <IoSettings  className="logouticon"/>,
        name:"Setting & Privacy",
        id:1
    },
    {
        icon:<RiFeedbackFill  className="logouticon"/>,
        name:"Give Feed back",
        id:2
    },
    {
        name:"Log Out",
        icon:<GrLogout  className="logouticon"/>,
        id:3
    }]

    let posticon = [
        {
            name: "Live Video",
            icon: <FaVideo />,
            idname: "pvideo",
            id: 1
        },
        {
            name: "Photo/Video",
            icon: <IoIosImages/>,
            idname: "pimage",
            id: 2

        },
        {
            icon: <MdOutlineSentimentSatisfiedAlt />,
            name: "Felling/activity",
            idname: "emoji",
            id: 3

        }
    ]
    let comment = (id) => {
        let x = state.data.defaultpost.map((e) => {
            return id === e.id ? { ...e, comboo: !e.comboo } : e
        })
        dispatch(handledefaultpost(x))
    }

    // console.log(state.data.create)
    var like = ['Hashini, APTA, Durga and ', 'Akilan , Ananthi, Sri and ', 'Btsarmy, kayal, durga and ', 'Anu, Santhi, Hrithik and']
    // var likecount = [31, 44, 7, 86, 77, 23]
    var file
    let handle = (e) => {
        console.log(Math.random() * like.length);
       var id = state.data.id
        console.log(e.target.files[0]);
        file = e.target.files[0]
        var post = {
            name: state.data.profile,
            id: id,
            dpurl: "https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg",
            url: file,
            // like: like[Math.floor(Math.random() * like.length)],
            // likecount: likecount[Math.floor(Math.random() * likecount.length)],
            // likecount:0,
            boo: false,
            caption: caption,
            comboo: false,
            deleteboo:false,
            day: "Just Now",
            comment:[]
        }
        let x = state.data.defaultpost.map((e) => {
            return e
        })
        x.push(post)
        dispatch(handledefaultpost(x))
        setcaption('')
        dispatch(handleid((state.data.id)+1))
    }
    let handlecap = (e) => {
        if (e.target.name==='cap') {
            setcaption(e.target.value)
        }
        else   if (e.target.name==='comm') {
            setcomm(e.target.value)
        }
    }
    let liking = (id) => {
        let x = state.data.defaultpost.map((e) => {
            // return id === 0 || 1? { ...e, boo: !e.boo } :id===e.id?e.boo?{ ...e, boo: !e.boo,like:"tamil" }: { ...e, boo: !e.boo,like:"kalai" }:e
            return e.id===id? { ...e, boo: !e.boo }:e
        })
        dispatch(handledefaultpost(x))
    }
    let commpost=(id)=>{
       let y={
            "name":state.data.profile,
            "path":"https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg",
            "com":comm
        }
        console.log(y);
        let x = state.data.defaultpost.map((e) => {
            return id===e.id ? { ...e, comment:[...e.comment,y]} : e
        })
        console.log(x);
        dispatch(handledefaultpost(x))
        setcomm('')
    }
    let del=(id)=>{
        let x = state.data.defaultpost.map((e) => {
            return id===e.id ? { ...e,deleteboo:true} : e
        })
        dispatch(handledefaultpost(x))
    }
    let savedel=(id)=>{
        let x = state.data.defaultpost.map((e) => {
            return id===e.id ? { ...e,select:!e.select} : e
        })
        dispatch(handledefaultpost(x))
    }
    let save=(id)=>{
        let x = state.data.defaultpost.map((e) => {
            return id===e.id ? {...e,select:!e.select,save:!e.save} : e
        })
        dispatch(handledefaultpost(x))
    }

    let view=(id)=>{
        console.log(id)
        if(id===3){
            a("/save")
        }

    }
    return <section id='homesec'>
        <section className='home1sec'>
            <div className='home1con'>
                <div className='home1row'>
                    <div className='home1col'>
                        <div className="home1img"><img src="https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg" /></div>
                        <p>{state.data.profile}</p>
                    </div>
                    {
                        state.data.arr.map((e, i) => {
                            return <div className='home1col' key={i}  onClick={()=>{view(e.id)}}>
                                <div className='home1img'><img src={e.url} /></div>
                                <p>{e.name}</p>
                            </div>
                        })
                    }
                    <div className='home1col'>
                        <div className='home1img'><IoIosArrowDown id='downicon' /></div>
                        <p>See More</p>
                    </div>
                </div>
            </div>
        </section>

        <section className='post'>
            <div className='postcon'>
                <div className='postrow1'>
                    <div className='home1col'>
                        <div className="home1img1"><img src="https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg" /></div>
                        <input type='text' onChange={handlecap} name='cap' value={caption} id='input' placeholder={`whats on your mind, ${state.data.profile}?`} />
                        <div id='pimage'>  <div onClick={imagepost}><IoIosImages className='file' /><input type='file' className='fileinput' ref={inputRef} name='file' onChange={handle} /></div></div>
                    </div>
                    <hr></hr>
                    <div className='postvie'>
                        {
                            posticon.map((e, i) => {
                                return <div id={e.idname} className='picon' key={i}>
                                    <div onClick={()=>handleOpen(e.id)}>{e.icon} </div>
                                    <p>{e.name}</p>
                                </div>

                            })
                        }
                    </div>
                </div>
                <div className='postrow2'>
                    {
                        state.data.defaultpost.map((e, i) => {
                            return !e.deleteboo?<div className='postrow2col' key={i}>
                                <div className='postrow2col-1'>
                                    <div className='postdp'>
                                        <div className='postdpimg'>
                                            <img src={e.dpurl} />
                                        </div>
                                        <div>
                                            <p className='username'>{e.name}</p>
                                            <p className='useruse'>{e.day}</p>
                                        </div>
                                    </div>
                                    <div className='postmenu'>
                                        <CiMenuKebab className='menuicon' onClick={()=>savedel(e.id)}/>
                                        <RxCross2 className='menuicon' />

                                    </div>
                                    {
                                        e.select?!e.save?<div className='savedel'>
                                        <p onClick={()=>save(e.id)}> Save </p><br/>
                                        <p onClick={()=>{del(e.id)}}> Delete </p>
                                        </div>:<div className='savedel'>
                                        <p onClick={()=>save(e.id)}> Unsave </p><br/>
                                        <p onClick={()=>{del(e.id)}}> Delete </p>
                                        </div>:""
                                    }

                                </div>
                                <p className='cap'>{e.caption}</p>
                                {
                                    e.url ? e.url.type === 'video/mp4' || e.url.type === 'video/mp3' || e.url.type === 'video/mov' ?
                                        <div className='postimage'>
                                            <video controls className='imgvid'>
                                                <source src={URL.createObjectURL(e.url)} type="video/mp3" />
                                                <source src={URL.createObjectURL(e.url)} type="video/mp4" />
                                                <source src={URL.createObjectURL(e.url)} type="video/mov" />
                                            </video>
                                        </div> :
                                        <div className='postimage'><img className='imgvid' src={URL.createObjectURL(e.url)} /></div>
                                        : <div className='postimage'>
                                            <img className='imgvid' src={e.imgurl} />
                                        </div>
                                }
                                <div className='likecomment'>
                                    {e.boo ?e.likecount? <p className='comlike'><BiSolidLike style={{ color: "blue" }} /> Liked by {e.like} {e.likecount + 1} Others</p>:<p className='comlike'><BiSolidLike style={{ color: "blue" }} /> Liked by {state.data.profile}</p> : e.like?<p className='comlike'><BiSolidLike style={{ color: "blue" }} /> Liked by {e.like} {e.likecount} Others</p>:<p  className='comlike'><BiSolidLike style={{ color: "blue" }} /> 0 Likes</p>}
                                    {e.comment.length>0?<p className='likecom'>{e.comment.length} comment</p>:<p className='likecom'>Comment</p>}
                                </div>
                                <hr></hr>
                                <div className='likecommmentshare'>
                                    <div>
                                        {e.boo ? <BiSolidLike style={{ color: "blue" }} onClick={() => liking(e.id)} /> : <BiLike onClick={() => liking(e.id)} />}
                                        <p>Like</p>
                                    </div>
                                    <div>
                                        <GoComment />
                                        <p onClick={() => comment(e.id)}  style={{cursor:"pointer"}}>Comment</p>
                                    </div>
                                    <div>
                                        <RiShareForwardLine />
                                        <p>Share</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <div>
                                    {e.comboo ?
                                        e.comment.map((a) => {
                                            return <div className='postdp com'>
                                                <div className='postdpimg'><img src={a.path} /></div>
                                                <div>
                                                    <p className='username'>{a.name}</p>
                                                    <p className='useruse'>{a.com}</p>
                                                </div>
                                            </div>
                                        }) : ""
                                    }
                                </div>
                                <hr></hr>
                                <div className='home1col'>
                                    <div className="home1img"><img src="https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg" /></div>
                                    <input type='text' onChange={handlecap} name='comm' value={comm} id='input' placeholder={`${state.data.profile} Comment your opinion`} />
                                    {/* <div id='pimage'>  <div><IoIosImages className='file' /><input type='file' name='file' onChange={handle} /></div></div> */}
                                    <p onClick={()=>commpost(e.id)} style={{cursor:"pointer"}}>post</p>
                                </div>
                               

                            </div>:''
                        })
                    }
                </div>
            </div>
        </section>

        <section id='contact'>
            <div className='constactcon'>
                <div className='contactrow1'>
                    <h2>Contact</h2>
                    <p>See All</p>
                </div>
                <div className='home1row'>
                    {
                        state.data.frd.map((e, i) => {
                            return <div className='home1col frd' key={i}>
                                <div className='home1img'><img src={e.url} /></div>
                                {e.boo ? <div className='online'></div> : ''}
                                <p>{e.name}</p>
                            </div>
                        })
                    }

                </div>
            </div>

        </section>
        {state.data.view? <section className='logoutsec'>
            <div className='logoutcon'>
                <div className='logoutrow1'>
                    <div className="profile">
                        <img src='https://beingselfish.in/wp-content/uploads/2023/09/cat-dp40.jpg'/>

                    </div>
                    <div className="proname">
                    <p>{state.data.profile}</p>
                    <p className="view">View Profile</p>
                    </div>
                </div>
                <div className="logoutrow2">
                    {
                        state.data.arr.map((e,i)=>{
                            return  <div className="others" key={i}  onClick={()=>{view(e.id)}}>
                                <div className="profile" ><img src={e.url}/></div>
                                <p>{e.name}</p>
                            </div>
                        })
                    }

                </div>
                <div className="logoutrow3">
                    {
                        logout.map((e,i)=>{
                            return <div className="logout" onClick={()=>out(e.id)} key={i}>
                                <div>{e.icon}</div>
                                <p>{e.name}</p>
                            </div>
                        })

                    }
                </div>

            </div>

        </section>:''}
        <section>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
<Modal
  open={state.data.box}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description">
  <Box>
    <Createpost/>
  </Box>
</Modal>
        </section>
    </section>
}
export default Home