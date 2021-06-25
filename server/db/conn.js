const mongoose = require('mongoose');

const DB = 'mongodb+srv://vedant:884zqcdma@op@cluster0.mlupm.mongodb.net/mernstack?retryWrites=true&w=majority';
// const DB = process.env.DATABASE ;

mongoose.connect( DB , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log("Connection Successful");
}).catch((e) => console.log(`erroeee:${e}`));
