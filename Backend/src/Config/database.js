import   mongoose from "mongoose"
import { DB_NAME } from "../Constant.js";


// use mongoose to connect database with server...

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Database Connect Successfully! ,  HostName : ${mongoose.connection.host}`)
    }catch(error) {
        console.log("Database connection error occur!", error);
        process.exit(1);
    }
}

//  use Nodejs Driver ...... tot connect databse... with server...
// export const connectDB = async () => {
//    
//     try {
//         await MongoClient.connect(db_url);
//         console.log("Database connect successfully ",);

//     }
//     catch (error) {
//        console.log("Database connection error occur!", error);
       // process.exit(1);
//     }
// }
