const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
    {
        username: {
            type: String,
        },
        password: String,
    },
    {
        timestamps: true,
    }
);

const Venue = model("Venue", venueSchema);

module.exports = Venue;


username, email, password, address, avatar, images, description, capacity
