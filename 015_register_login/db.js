const Sequelize = require("sequelize");
const sequelize = new Sequelize("demo", "root", "", {
    dialect: "mysql",
    host: "localhost",
    define:{
      freezeTableName:true
    }
  });

  module.exports = sequelize
  
  // const db = sequelize.define('registration',{
  //   FirstName:{
  //     type:Sequelize.STRING
  //   },
  //   LastName:{
  //     type:Sequelize.STRING
  //   },
  //   Email: { type: Sequelize.STRING },
  //   Password:{
  //     type:Sequelize.STRING
  //   }
    
  // });

  // const db2 = sequelize.define('user_roles',{
  //   roles:{
  //     type:Sequelize.STRING
  //   },
  //   user_id:{
  //     type:Sequelize.INTEGER 
      

  //   }
  // })
//  
  
// db.belongsTo(db2)
// db.hasMany(db2) 

// db2.belongsTo(db)

// sequelize
// .sync()
// .then((result)=>{
//   console.log(result);
  
// }).catch((err)=>)
// console.log(db);


  // module.exports= {db,db2};


//   import {Sequelize} from "sequelize-typescript"

// export const sequlize = new Sequelize('registration', 'root', '', {
//    host: 'localhost',
//    dialect: 'mysql',
//    models: [__dirname + '/models'] 
// });
