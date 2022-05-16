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
            twitter: { type: String }
        },
        phoneNumber: String,
        avatar: {
            type: String,
            default: './../img/defaultImg.png'
        },
        role: {
            type: String,
            default: 'Label'
        },
        description: String,
        duty: {
            type: String,
            enum: ['RecordLabel', 'Management']
        },
        representedArtists:
            [{
                type: Schema.Types.ObjectId,
                ref: 'Artist'
            }],
        likedEvents: [{
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }],
        likedArtists: [{
            type: Schema.Types.ObjectId,
            ref: 'Artist'
        }],
        likedVenues: [{
            type: Schema.Types.ObjectId,
            ref: 'Venue'
        }]

    },
    {
        timestamps: true,
    }
);

const Label = model("Label", labelSchema);

module.exports = Label

