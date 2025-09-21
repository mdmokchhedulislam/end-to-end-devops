const mongoose = require("mongoose")

const connectMONGODB = async()=>{
        try {
                await mongoose.connect(process.env.MONGO_URI)
                console.log(`the db is connect with ${mongoose.connection.host}`);
                
        } catch (error) {
            mongoose.disconnect()
            process.exit(1)
        }
}

module.exports=connectMONGODB