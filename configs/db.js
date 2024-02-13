
import mongoose from "mongoose"

const connectDatabase = await mongoose.connect(process.env.DBURL)

export default connectDatabase;