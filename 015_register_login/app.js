const express =require('express');
// import * as bodyParser from "body-parser";

// import { request } from "http";
// const sequelize = require('../db')

// import { where } from "sequelize/types"
// import {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode} from "http-status-codes"
// import { UserInterface } from "./models/user-model";

const db = require('./model/user')
const db2 = require("./model/user_roles")


const bcrypt = require("bcryptjs");

// const register = require('./db');


const jwt = require("jsonwebtoken");
const sequelize = require('./db');

const app = express();

app.use(express.json());

const PORT = 5000;


//  ---- Users
app.post("/", async (request, response) => {
  const salt = await bcrypt.genSalt(10);
 const user=request.body
  const pass = await bcrypt.hash(user.Password, salt);
  console.log(pass);
  try {
    const result = await db.create({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Password: pass,
    });
    // await register.create(user);
    response.status(200).send({
      message: "data send",
      data: result,
    });
  } catch (error) {
    response.status(405).send({
      message: `error ${error}`,
    });
  }
});

db.hasMany(db2);

// testing 

// const registerId = register.db
// console.log(registerId);

// register.db.hasMany(register.db2);
let userId = null;
app.get("/db2",async(request,response)=>{
  // try {
      
  //     const user= await register.db2.findAll();
  //     console.log(user);
  //     const user2= await register.db1.findAll();
  //     console.log(user2);
  //     const user3=user2.createOrder(user);

  //     response.json({
  //       data:user3
  //   })
  //   } catch (error) {
  //     response.json({
  //       message:`show me ${error}`
  //   })
  //   }
  // const user = db.findAll().then(result=>{
  //   console.log(result);
  // })
  sequelize
  .sync({force:true})
  .then(user=>{
    userId = user.id;
    console.log(userId);
    return user.findOne()
  })
  .then(user_role=>{
    console.log(user_role);
    return user_role.findOne({where:userId})
  })
  .catch(err=>{
    console.log(err);
  })
 
})
// console.log(user_roles.db2);


app.get("/", async (request, response) => {
  const user = await db.findAll();
  try {
    response.status(200).json({
      count: user.length,
      message: "get all user",
      data: user,
    });
  } catch (error) {
    response.status(404).json({
      message: `show me ${error}`,
    });
  }
});

// Login page 

app.post("/login",async(request,response)=>{
        const result =await db.findOne({where:{Email:request.body.Email}})
        if (!result) {
          return response.status(404).send({
              message:"DONT MESS WITH US PROVIDE PROPER EMAIL"
          })
      }

      const match = await bcrypt.compare(request.body.Password,result.Password)
      if (!match) {
          return response.status(404).send({
              message:"PASSWORD: YOU ARE DUMB WE TOLD YOU DONT MESS WITH US"
          })

      }

      // if All Matched

      const token = await jwt.sign({id:result._id},"Sosimtech")
      response.status(200).send({
          data:result,
          message:"Congrates you are logged in ",
          token
      })
 
      });
    
    

app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`);
});
