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
            spotify: { type: String },
            soundcloud: { type: String },
            twitter: { type: String }
        },
        phoneNumber: String,
        images: {
            avatar: {
                type: String,
                default: './../img/defaultImg.png'
            },
            others: [String]
        },
        role: {
            type: String,
            enum: ['Attendant', 'Artist', 'Venue', 'Event', 'Label']
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
        c: Number
    },
    {
        timestamps: true,
    }
);

const Venue = model("Venue", venueSchema);

module.exports = Venue;

