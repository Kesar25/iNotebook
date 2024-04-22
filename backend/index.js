const express=require("express");
const app=express();
const dbConnection=require("./db/conn.js");

dbConnection();