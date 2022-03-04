const Sequelize = require("sequelize");

const sequelize = require('../db')

const db2 = sequelize.define('user_roles',{
    roles:{
      type:Sequelize.STRING
    },
    user_id:{
      type:Sequelize.INTEGER 
      

    }
  })
 module.exports = db2