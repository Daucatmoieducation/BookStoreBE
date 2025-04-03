import mongoose from 'mongoose'

async function connect(){
    try {
        await mongoose.connect('mongodb+srv://user1:fnuSEG0PPVFP0hC7@salebookdb.vyi31jt.mongodb.net/salebook?retryWrites=true&w=majority&appName=SaleBookDB');
        console.log("connect successfully")
    }
    catch (error) {
        handleError(error);
        console.log("connect failed")
    }
}

export default connect;