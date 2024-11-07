import app from "./app.js";
import connectDB from "./db/index.js";


connectDB().then(() => {
    app.listen(8000, () => {
        console.log("Server is running on port:- ", 8000);
    })
}).catch((err) => {
    console.log("Failed to connect mongoDB! Please check your internet connection! ", err);
})