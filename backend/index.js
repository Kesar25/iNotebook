const dbConnection=require("./db/conn");
const userRouter=require("./routes/auth.js");
const notesRouter=require("./routes/notes.js")
const express=require("express");

const app=express();
dbConnection();

app.use(express.json())
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notes", notesRouter);

app.listen(8000,()=>{
    console.log("Listening at port 8000");
}) 

