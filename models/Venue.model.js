const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
    {
        username:String,
        email:String,
        password:String,
        description:String,
        address:String,
        capacity:Number,
        images: {
            avatar: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
            rest: [String]
        },
    },
    {
        timestamps: true,
    }
);

const Venue = model("Venue", venueSchema);

module.exports = Venue;

