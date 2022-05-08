const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
    {
        username: {
            type: String,
            unique: [true, 'El nombre de usuario ya está registrado']
        },
        email: {
            type: String,
            unique: [true, 'El email ya está registrado']
        },
        password: String,
        description: String,
        address: String,
        capacity: Number,
        images: {
            avatar: {
                type: String,
                default: './../img/defaultImg.png'
            },
            rest: [String]
        },
    },
    {
        timestamps: true,
    }
);

const Venue = model("Venue", venueSchema);

module.exports = Venue;

