const {mongoose}= require('mongoose')

const connectDB = (url) => {
  return(
    mongoose.set("strictQuery", false),
     mongoose.connect(url,{
      useNewUrlParser: true ,
      useUnifiedTopology: true,
     // useCreateIndex:true
     })
  )
}
module.exports =  connectDB