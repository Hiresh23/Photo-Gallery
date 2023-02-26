import React from 'react'
import "./gallery.css"
import {Link} from "react-router-dom"
import {storage , db} from '../firebase'
import {BsTrash} from 'react-icons/bs'
import { AiOutlineFileImage, AiOutlineClose } from 'react-icons/ai'
import { uploadBytesResumable,getDownloadURL,ref} from 'firebase/storage'
import { doc, setDoc,getDoc ,updateDoc, arrayUnion, onSnapshot,arrayRemove} from 'firebase/firestore'
import {v4 as uuid} from 'uuid'
const Uttarayan = () => {
    const [data , setData] = React.useState([])
    //////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res = await getDoc(doc(db , "uttarayan" , "Uttarayan"))
        if(!res.exists()){
            await setDoc(doc(db ,"uttarayan","Uttarayan"),{images:[]})
        }
        const file = e.target[0].files[0];
        try { 
            const storageRef = ref(storage,file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            await uploadTask.then(() => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                   await updateDoc(doc(db ,"uttarayan","Uttarayan"),{
                     images: arrayUnion({
                        photoURL: downloadURL,
                        id: uuid(),
                    })
                }) ;
                }
                );
            });
        } catch (error) {
            console.log(error)
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    let info 
    try {
        const unsub = onSnapshot(doc(db ,"uttarayan","Uttarayan"), (doc) => {
            setData(doc.data().images)
        });

        info = data.map((i) =>{
            return (<div className='pics' key={i.id} onClick = {() => {setImage(i.photoURL)
             setImageId(i.id)}}>
            <img src={i.photoURL} alt="" /> 
            </div>)
        })
    } catch (error) {
        
    }
   /////////////////////////////////////////////////////////////////////
    const deleteImage = async() => {
    try {
       await updateDoc(doc(db ,"uttarayan","Uttarayan") ,{
               images : arrayRemove({
                 photoURL: imgSrc,
                 id : imgId,
               })
       })
    console.log(imgSrc , imgId);
    } catch (error) {
        console.log(error)
    }
    }
    /////////////////////////////////////////////////////////////////////////
    const [imgSrc , setImageSrc] = React.useState('')
    const [imgId , setImageId] = React.useState('')
    const [view , setView] = React.useState(false)
    const [delview , setDelView] = React.useState(false)
 
    function setImage(imgSrc){
        setImageSrc(imgSrc)
        setView(true)
    }

    const image = () =>{
        return (
     <div className={view?"popup":"" } >
            <img src={imgSrc} alt="" />
            <AiOutlineClose  style={!view?{display:"none"}:""} className='popout'onClick={() =>{ setImageSrc('')
            setView(false)
            setImageId('')
            }}/>
            <BsTrash style={!view?{display:"none"}:""} className='popout2' onClick={() =>{ setDelView(true)}}/>
     </div>
        )
    }
  return (
    <div className='gallery'>
          {view && image()}
        {delview &&<div className='delete'>
        <div className='delpop'>
                <span>Are sure you want to delete?</span>
                <div className='delButton'>
                   <button onClick={() =>{ deleteImage()
                   setView(false)
                   setDelView(false)}}>Yes</button>
                   <button onClick={() => setDelView(false)}>No</button>
                </div>
         </div>

        </div>}
        <div className='gallery-container'>
        <Link to="/" style={{color:"black" , textDecoration:"none"}}><h1>Photo Gallery</h1></Link> 
                 <form onSubmit={handleSubmit}>
                <input type="file" style={{display:"none"}} id="file"/>
                <label htmlFor='file'>
                <AiOutlineFileImage className = "file"style={{fontSize:"2em" ,marginRight:"5px"}}/>
                Add Image
                </label>
                <button type='submit'>Add</button>
                 </form>
                <div className='gallery-photos'>
                    {info}
                </div>
        </div>
    </div>
  )
}

export default Uttarayan