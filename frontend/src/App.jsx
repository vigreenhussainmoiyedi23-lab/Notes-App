import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NoteCard from "./components/NoteCard";
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
  useEffect(() => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }, []);
  const editHandler = async (id, description) => {
    axios
      .patch(`http://localhost:3000/api/notes/${id}`, { description })
      .then((res) => {
        let idx = notes.findIndex((n) => n._id.toString() == id.toString());
        if(idx==-1)return 
        let newNotes=notes.splice(idx, 1, res.data.note); 
        setNotes(newNotes)
      });
  };
  const deleteHandler = async (id) => {
    axios
      .delete(`http://localhost:3000/api/notes/${id}`)
      .then((res) => {
        let idx = notes.findIndex((n) => n._id.toString() == id.toString());
        let newNotes=notes.splice(idx, 1);
        setNotes(newNotes)
      });
  };

  const CreateHander = async () => {
    axios.post("http://localhost:3000/api/notes", NoteInput).then((res) => {
      setNotes((prev) => {
        return [...prev, res.data.note];
      });
    });
    setNoteInput({
      title: "",
      description: "",
    });
  };

  const [NoteInput, setNoteInput] = useState({
    title: "",
    description: "",
  });

  return (
    <>
      <form
        className="bg-[#efe] h-1/5 pt-10 min-h-max w-full flex flex-col px-5 py-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          CreateHander();
        }}
      >
        <div className=" backdrop-blur-2xl  flex flex-col px-3">
          <label htmlFor="title" className="text-2xl font-bold font-mono mb-1">
            Title
          </label>
          <input
            type="text"
            value={NoteInput.title}
            onChange={(e) => {
              setNoteInput((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
            id="title"
            name="title"
            placeholder="Enter Note Title"
            className="border rounded px-4 text-xl"
          />
        </div>
        <div className=" backdrop-blur-2xl  flex flex-col px-3">
          <label
            htmlFor="Description"
            className="text-2xl font-bold font-mono mb-1"
          >
            Description
          </label>
          <textarea
            type="text"
            onChange={(e) => {
              setNoteInput((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
            value={NoteInput.description}
            id="Description"
            name="Description"
            placeholder="Enter Note Description"
            className="border rounded px-4 text-xl"
          />
          <button className="bg-green-700 mt-4 text-white rounded-xl w-fit px-5 py-2">
            Create
          </button>
        </div>
      </form>

      <div className="notes">
        {notes.map((e, idx) => (
          <NoteCard
            note={e}
            idx={idx}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </>
  );
};

export default App;
