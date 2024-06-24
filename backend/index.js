const dbConnection=require("./db/conn");
const userRouter=require("./routes/auth.js");
const notesRouter=require("./routes/notes.js")
const express=require("express");
const cors = require('cors')
const app = express()

app.use(cors())
dbConnection();

app.use(express.json())
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notes", notesRouter);

app.listen(8000,()=>{
    console.log("Listening at port 8000");
}) 

