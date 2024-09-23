import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
    throw new Error("issue in databse connection");
  }
}

async function disconnectTodatabase() {
    try {
        await disconnect()
    } catch (error) {
        console.log(error);
        
    }
}

export{
    connectToDatabase,
    disconnectTodatabase
}