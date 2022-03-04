const Sequelize = require("sequelize");

const sequelize = require('../db')

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
module.exports = db