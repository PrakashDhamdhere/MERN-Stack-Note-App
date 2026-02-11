import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar';

const Home = () => {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateNoteID, setUpdateNoteID] = useState("");

  console.log("HEllo")

  function fetchNotes(){
    axios.get(`https://mern-stack-note-app-so6x.onrender.com/api/notes`)
    .then((res)=>{
      setNotes(res.data.notes);
    })
  }

  function handleSubmin(e){
    e.preventDefault();
    
    axios.post(`https://mern-stack-note-app-so6x.onrender.com/api/notes`, {
      title,
      description
    }).then((res)=>{
      console.log(res.data.message);
      fetchNotes();
      setTitle("");
      setDescription("");
    })
  }

  function handleDelete(id){
    let check = confirm("Are you sure you want to delete this note?");
    if(check){
      axios.delete(`https://mern-stack-note-app-so6x.onrender.com/api/notes/${id}`).then((res)=>{
        console.log(res.data.message);
        fetchNotes();
      })
    }
  }

  function handleEdit(id){
    axios.get(`https://mern-stack-note-app-so6x.onrender.com/api/notes/${id}`).then((res)=>{
      const note = res.data.note;
      setTitle(note.title);
      setDescription(note.description);
      setUpdate(true);
      setUpdateNoteID(id);
    })
  }
  function handleUpdate(){
    axios.patch(`https://mern-stack-note-app-so6x.onrender.com/api/notes/${updateNoteID}`, {
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
    fetchNotes();
  },[])



  return (
    <div className='w-full min-h-screen bg-zinc-900 pb-5'>
      <Navbar />
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
                <button onClick={()=>handleEdit(val._id)}>
                  <i className="ri-pencil-line text-xl  text-zinc-400 hover:text-zinc-100"></i>
                </button>
                <button onClick={()=>handleDelete(val._id)}>
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