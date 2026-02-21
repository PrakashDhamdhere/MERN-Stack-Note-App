import React, { useEffect, useState } from 'react'
import axios from '../utils/Axois'
import Navbar from './Navbar';

const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  function getMe(){
    axios.get("/api/auth/me").then((res)=>{
      setIsLoggedIn(res.data.success);
      setUserData(res.data.user);
    })
  }


  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateNoteID, setUpdateNoteID] = useState("");

  function fetchNotes(){

    if(!isLoggedIn){
     try{
      const localNotes = JSON.parse(localStorage.getItem("notes"))
     console.log(localNotes)
      localNotes && setNotes(localNotes);
      return   
     } catch(err){
      console.log(err.message);
     }
    }

    axios.get(`/api/notes`).then((res)=>{
        setNotes(res.data.notes);
    })

    
  }

  function handleSubmin(e){
    e.preventDefault();

    if(!isLoggedIn){
      setNotes([...notes, {title: title, description: description}])
      localStorage.setItem("notes", JSON.stringify([...notes, {title, description}]));
      fetchNotes()
      setDescription("");
      setTitle("");
      return
    }
    
    axios.post(`/api/notes`, {
      title,
      description
    }).then((res)=>{
      console.log(res.data.message);
      fetchNotes();
      setTitle("");
      setDescription("");
    })
  }

  function handleDelete(id, idx){

    if(!isLoggedIn){
      localStorage.setItem("notes", JSON.stringify(notes.filter((val, index)=> index != idx)))
      fetchNotes();
      return
    }

    let check = confirm("Are you sure you want to delete this note?");
    if(check){
      axios.delete(`/api/notes/${id}`).then((res)=>{
        console.log(res.data.message);
        fetchNotes();
      })
    }
  }

  function handleEdit(id, idx){

    if(!isLoggedIn){
      setTitle(notes[idx].title)
      setDescription(notes[idx].description)
      setUpdate(true);
      setUpdateNoteID(idx);
      return
    }

    axios.get(`/api/notes/${id}`).then((res)=>{
      const note = res.data.note;
      setTitle(note.title);
      setDescription(note.description);
      setUpdate(true);
      setUpdateNoteID(id);
    })
  }
  function handleUpdate(){

    if(!isLoggedIn){
      // setNotes(...notes, notes[updateNoteID].description = description)
      localStorage.setItem("notes", JSON.stringify(notes.map((obj, idx)=> idx == updateNoteID ? {...obj, description:description} : obj)))
      fetchNotes();
      setUpdateNoteID("")
      setUpdate(false);
      setTitle("");
      setDescription("");
      return
    }

    axios.patch(`/api/notes/${updateNoteID}`, {
      title,
      description
    }).then((res)=>{
      console.log(res.data.message);
      setUpdateNoteID("");
      fetchNotes();
      setUpdate(false);
      setTitle("");
      setDescription("");
    })
  }

  useEffect(()=>{
    getMe();
    fetchNotes();
  },[isLoggedIn])



  return (
    <div className='w-full max-w-400 mx-auto min-h-screen bg-zinc-900 pb-5'>
      <Navbar userData={userData} isLoggedIn={isLoggedIn} />
      <div className='w-fit mx-auto mt-10'>
        <div>
          <form onSubmit={(e)=>{handleSubmin(e)}} className='w-full flex flex-col items-center gap-2 mb-12 px-2' >
            <input disabled={update} required value={title} onChange={(e)=>setTitle(e.target.value)} name='title' type="text" placeholder='Title' className={`w-full border-2 border-zinc-200 rounded px-3 py-1 text-xl font-semibold lg:w-80 ${update ? "text-zinc-400 border-zinc-400" : ""}`} />
            <input value={description}  onChange={(e)=>setDescription(e.target.value)} name='description' type="text" placeholder='Description' className='w-full border-2 border-zinc-200 rounded px-3 py-1 text-xl font-semibold lg:w-80' />
            {
              !update ? <input type="submit" value="Create Note" className='px-3 py-1 mt-2 text-2xl lg:text-xl font-semibold bg-zinc-700 rounded-md hover:bg-zinc-600' /> : <div>
                <input onClick={()=>{setUpdate(false); setTitle(""); setDescription("")}} type="button" value="Cancle" className='px-3 py-1 m-2 text-2xl lg:text-xl font-semibold bg-zinc-600 rounded-md hover:bg-zinc-500' />
                <input onClick={handleUpdate} type="button" value="Update" className='px-3 py-1 m-2 text-2xl lg:text-xl font-semibold bg-zinc-600 rounded-md hover:bg-zinc-500' />
              </div>
            }
          </form>
        </div>
        {
          notes.map((val, idx)=>{
            return <div key={idx} className='flex justify-between px-3 py-2 rounded-md my-3 bg-zinc-700 w-80 lg:w-[40vw]'>
              <div className=''>
                <h1 className='text-2xl font-semibold'>{idx+1}. {val.title}</h1>
                <p className='text-zinc-400 text-xl font-semibold my-1'>{val.description}</p>
              </div>
              <div className='flex justify-between gap-4'>
                <button onClick={()=>handleEdit(val._id, idx)}>
                  <i className="ri-pencil-line text-xl  text-zinc-400 hover:text-zinc-100"></i>
                </button>
                <button onClick={()=>handleDelete(val._id, idx)}>
                  <i className="ri-close-line text-xl text-zinc-400 hover:text-zinc-100"></i>
                </button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Home