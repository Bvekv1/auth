require("dotenv").config();

module.exports = {
  development:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbUser,
      password : process.env.dbPass,
      database : 'login',
      port : process.env.dbPort || 3306
    },

  },
  production:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbUser,
      password : process.env.dbPass,
      database : 'login'
    }
  },
  testing:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbUser,
      password : process.env.dbPass,
      database : 'login'
    }
  }
};