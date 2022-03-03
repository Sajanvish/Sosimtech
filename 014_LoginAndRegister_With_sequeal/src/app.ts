// import { log } from "console";
import express, { Application, response } from "express";
import * as bodyParser from "body-parser";
import { request } from "http";
import console, { log } from "console";

const bcrypt = require("bcryptjs");

const register = require("./db");

const jwt = require("jsonwebtoken")

const app: Application = express();

app.use(bodyParser.json());

const PORT = 5000;

// Registration
app.post("/", async (request, response) => {
  const salt = await bcrypt.genSalt(10);

  const pass = await bcrypt.hash(request.body.Password, salt);
  console.log(pass);
  try {
    const result = await register.create({
      FirstName: request.body.FirstName,
      LastName: request.body.LastName,
      Email: request.body.Email,
      Password: pass,
    });
    // await register.create(user);
    response.send({
      message: "data send",
      data: result,
    });
  } catch (error) {
    response.send({
      message: `error ${error}`,
    });
  }
});

app.get("/", async (request, response) => {
  const user = await register.findAll();
  try {
    response.json({
      count: user.length,
      message: "get all user",
      data: user,
    });
  } catch (error) {
    response.json({
      message: `show me ${error}`,
    });
  }
});

// Login page 

app.post("/login",async(request,response)=>{
        const result =await register.findOne({Email:request.body.Email})
        if (!result) {
          return response.json({
              message:"DONT MESS WITH US PROVIDE PROPER EMAIL"
          })
      }

      const match = await bcrypt.compare(request.body.Password,result.Password)
      if (!match) {
          return response.json({
              message:"PASSWORD: YOU ARE DUMB WE TOLD YOU DONT MESS WITH US"
          })

      }

      // if All Matched

      const token = await jwt.sign({id:result._id},"Sosimtech")
      response.json({
          data:result,
          message:"Congrates you are logged in ",
          token
      })
  //     try {
  //       const {Email,Password}=request.body;

  //       if (!(Email && Password)) {
  //         response.status(400).send("All input is required");
  //       }
  //     // Validate if user exist in our database
  //     const user = await register.findOne({ Email });

  //     if (user && (await bcrypt.compare(Password, user.Password))) {
  //       // Create token

      
  //   const token = await jwt.sign({id:user.id},"sgsshgd")
  //   response.json({
  //       data:user,
  //       message:"Congrates you are logged in ",
  //       token
  //   })
  // }
  //     } catch (error) {
  //       response.status(404).send({
  //         message:`show me ${error}`
  //       })
        
  //     }
      })
    
    

app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`);
});
