import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
import '../Home/Home.css'
import { handledefaultpost } from "../Slice";

const Save=()=>{
    let state = useSelector((e) => e)
    let dispatch=useDispatch()
    var [caption, setcaption] = useState('')
    var [comm,setcomm]=useState('')
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
    let comment = (id) => {
        let x = state.data.defaultpost.map((e) => {
            return id === e.id ? { ...e, comboo: !e.comboo } : e
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
    // let del=(id)=>{
    //     let x = state.data.defaultpost.map((e) => {
    //         return id===e.id ? { ...e,deleteboo:true} : e
    //     })
    //     dispatch(handledefaultpost(x))
    // }
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

    return <div>
        
        <section className='post' style={{margin:"auto"}}>
            <div className='postcon'>
                <div className='postrow2'>
                    {
                        state.data.defaultpost.map((e, i) => {
                            return !e.deleteboo && e.save?<div className='postrow2col' key={i}>
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
                                        <p onClick={()=>save(e.id)}> Save </p>
                                        {/* <p onClick={()=>{del(e.id)}}> Delete </p> */}
                                        </div>:<div className='savedel'>
                                        <p onClick={()=>save(e.id)}> Unsave </p>
                                        {/* <p onClick={()=>{del(e.id)}}> Delete </p> */}
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
                                </div>
                                <p onClick={()=>commpost(e.id)} style={{cursor:"pointer"}}>post</p>

                            </div>:''
                        })
                    }
                </div>
            </div>
        </section>

    </div>

}
export default Save