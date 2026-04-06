import React from "react";
import { useState } from "react";

const NoteCard = ({ note, idx,editHandler,deleteHandler }) => {
  const [editData, setEditData] = useState({
    description: note.description || "",
  });

  const [isEditting, setIsEditting] = useState(false);
  return (
    <div key={idx} className="note relative">
      <div
        style={isEditting ? { top: "5px" } : {}}
        className="absolute bottom-5 right-5 gap-4 flex items-center justify-between px-5 py-2 text-white"
      >
        <button
          onClick={() => {
            if (isEditting) {
                editHandler(note._id,editData.description)
            }
            setIsEditting((prev) => !prev);
          }}
          className="bg-blue-400 px-3 py-2 rounded text-xl"
        >
          {isEditting ? "Update" : "Edit"}
        </button>
        {!isEditting && (
          <button
            onClick={() => {
              deleteHandler(note._id);
            }}
            className="bg-red-500 px-3 py-2 rounded text-xl"
          >
            Delete
          </button>
        )}
      </div>
      <h1>{note.title} </h1>
      {!isEditting && (
        <>
          <p>{note.description}</p>
        </>
      )}
      {isEditting && (
        <>
          <div className="   flex flex-col px-3">
            <label
              htmlFor="Description"
              className="text-2xl font-bold font-mono mb-1"
            >
              Description
            </label>
            <textarea
              type="text"
              onChange={(e) => {
                setEditData((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
              value={editData.description}
              id="Description"
              name="Description"
              placeholder="Enter Note Description"
              className="border rounded px-4 text-xl"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
