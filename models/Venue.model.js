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
        networks: {
            instagram: { type: String },
            twitter: { type: String }
        },
        phoneNumber: String,
        avatar: {
            type: String,
            default: './../img/defaultImg.png'
        },
        images: {
            image1: { type: String },
            image2: { type: String },
            image3: { type: String },
            image4: { type: String },
        },
        role: {
            type: String,
            default: 'Venue'
        },
        description: String,
        address: {
            street: String,
            number: Number,
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

