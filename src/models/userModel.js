const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: String,
        required: true,
    }
},
    {timestamps: true}
)

const UserModel = mongoose.model('UserModel', userModel);

module.exports = UserModel;