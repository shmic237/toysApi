// Name,Email,Password,date_created,role
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: new Date(),
    },
    roles: {
        type: String, 
        enum: ["user", "admin"],
        required: true,
        default: "user"
    }
});

userSchema.pre("save", function(next) {
    this.id = String(this._id);
    next();
});


const User = model("User", userSchema);

module.exports.User = User;