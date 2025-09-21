const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
    title:String ,
    desc:String ,
    content:String

},{
    timestamps:true
})

const model = mongoose.model("blog",schema)

module.exports = model