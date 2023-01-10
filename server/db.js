const mongoose = require("mongoose");
// require("dotenv").config()

// const dbUrlStr = "mongodb://127.0.0.1:27017/sessions"

mongoose.connect(process.env.DB_STR, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("database connected"))
.catch(err => console.log("database error....", err))