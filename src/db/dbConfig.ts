import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB Connected');
            
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is upand running' + err);
            process.exit()
            
        })

    } catch (error) {
        console.log("Something went error in connecting to DB");
        console.log(error);
    }
}