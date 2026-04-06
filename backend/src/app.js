const express = require("express")
const app = express()
const noteModel = require("./model/notes.model")
const cors=require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body
    const note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "note created successfully",
        note
    })
})
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "notes sent successfully",
        notes
    })
})
/*
- Patch-/api/notes/:id
- Updates the description of the note
-req.body={description}
*/
app.patch("/api/notes/:id", async (req, res) => {
    const { id } = req.params
    const note = await noteModel.findByIdAndUpdate(id, { description: req.body.description }, { new: true })
    res.status(200).json({
        message: "note Updated successfully",
        note
    })
})
app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params
    const note = await noteModel.findByIdAndDelete(id)
    res.status(204).json({
        message: "note deleted successfully",
        note
    })
})

module.exports = app