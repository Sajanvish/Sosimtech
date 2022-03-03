const Sequelize = require("sequelize");
const sequelize = new Sequelize("demo", "root", "", {
    dialect: "mysql",
    host: "localhost",
    define:{
      freezeTableName:true
    }
  });
  
  const db = sequelize.define('registration',{
    FirstName:{
      type:Sequelize.STRING
    },
    LastName:{
      type:Sequelize.STRING
    },
    Email: { type: Sequelize.STRING },
    Password:{
      type:Sequelize.STRING
    }
    


  });
  module.exports= db;


//   import {Sequelize} from "sequelize-typescript"

// export const sequlize = new Sequelize('registration', 'root', '', {
//    host: 'localhost',
//    dialect: 'mysql',
//    models: [__dirname + '/models'] 
// });
