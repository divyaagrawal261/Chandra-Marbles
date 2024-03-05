import mongoose from "mongoose";

const connectDb = async () => {
try {
const connect = await mongoose.connect(process.env.MONGO_URI);
console.log("Database is connected successfully : ",connect.connection.host, connect.connection.name);
}

catch(err)
{
    console.log(err);
    process.exit(1);
}
}
export default connectDb;