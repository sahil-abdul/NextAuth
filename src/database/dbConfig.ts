import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.APP_NAME}`)
        const connection = mongoose.connection

        connection.on("connected",() => {
            console.log("db connected");
        })

        connection.on("error", (err) => {
            console.log("dbConfig || connection error || ",err)
            process.exit()
        })
    } catch (error) {
        console.log("error in db connection : ",error);
    }
}