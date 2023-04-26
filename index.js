const dbconfig = require('../config/dbconfig');
const {Sequelize,DataTypes}= require('sequelize');
const sequelize=new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,{
        host:dbconfig.HOST,
        dialect:dbconfig.dialect, 
        operatorsAliases:0,
        pool:{
            max:dbconfig.pool.max,
            min:dbconfig.pool.min,
            acquire:dbconfig.pool.acquire,
            idle:dbconfig.pool.idle,
        }
    }
)
sequelize.authenticate()
.then(()=>{
    console.log('connected')
})
.catch(err =>{
    console.log('error'+err)
})

const db ={}
db.Sequelize=Sequelize
db.sequelize=sequelize
db.blog=require('./blog.js')(sequelize,DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log('yes done')
}
)
module.exports=db