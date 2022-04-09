const mongoose = require('mongoose');

const client_schema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
});

const Client= mongoose.model('client_data',client_schema);
module.exports=Client;