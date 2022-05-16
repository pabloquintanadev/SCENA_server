const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
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
            bandcamp: { type: String },
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
            default: 'Artist'
        },
        styles: [String],
        description: {
            type: String,
            required: [true, 'Cuéntanos algo sobre ti']
        },
        label: {
            type: Schema.Types.ObjectId,
            ref: 'Label'
        }
    },
    {
        timestamps: true,
    }
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;
