import React from "react";
import { useState } from "react";
import axios from "axios"
const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "kuch title 1",
      description: "kuch description",
    },
    {
      title: "kuch title 2",
      description: "kuch description",
    },
    {
      title: "kuch title 3",
      description: "kuch description",
    },
    {
      title: "kuch title 4",
      description: "kuch description",
    },
  ]);
  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
   setNotes(res.data.notes)
  })
  const editHandler=async (id)=> {
    axios.patch()
  }
  const deleteHandler=async (id)=> {
    
  }
  return (
    <>
      <div className="notes">
        {notes.map((e,idx) => (
          <div key={idx} className="note relative">
            <div className="absolute top-5 right-5 gap-4 flex items-center justify-between px-5 py-2 text-white">
              <button
              onClick={()=>{

              }} 
              className="bg-blue-400 px-3 py-2 rounded text-xl">
                Edit
              </button>
              <button className="bg-red-500 px-3 py-2 rounded text-xl">
                Delete
              </button>
            </div>
            <h1>{e.title} </h1>
            <p>{e.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
