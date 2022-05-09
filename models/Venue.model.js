const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        description: String,
        address: {
            street: String,
            number: Number,
            floor: Number,
            letter: String,
            postalCode: Number,
            city: String
        },
        capacity: Number
    },
    {
        timestamps: true,
    }
);

const Venue = model("Venue", venueSchema);

module.exports = Venue;

