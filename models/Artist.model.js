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
        styles: [String],
        socials: {
            instagram: { type: String },
            spotify: { type: String },
            soundcloud: { type: String },
            twitter: { type: String }
        },
        images: {
            avatar: {
                type: String,
                default: './../img/defaultImg.png'
            },
            rest: [String]
        },
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
