const { Schema, model, mongoose } = require("mongoose");

const toySchema = new Schema({
    id: {
        type: String,
        required: false,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, 
    img_url: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: new Date(),
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

toySchema.pre("save", function(next) {
    this.id = String(this._id);
    next();
});

const Toy = model("Toys", toySchema);

module.exports.Toy = Toy;