const { Schema, model } = require("mongoose");

const labelSchema = new Schema(
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
        phoneNumber: Number,
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
        duty:{
            type: String,
            enum: ['RecordLabel', 'Management']
        }
    },
    {
        timestamps: true,
    }
);

const Label = model("Label", labelSchema);

module.exports = Label

