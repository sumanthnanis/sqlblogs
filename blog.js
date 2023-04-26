module.exports=(sequelize,DataTypes)=>{
  const Blog = sequelize.define("blog",{
    title:{
      type:DataTypes.STRING,
      allowNull: false
    },
    snippet:{
      type: DataTypes.TEXT,
      allowNull: false
        
      },
    body:{
      type:DataTypes.TEXT,
      allowNull: false
    }  
  })
  return Blog
}






