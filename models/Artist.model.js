const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
    {
        username: String,
        email:String,
        password: String,
        styles:[String],
        socials:{
            instagram:String,
            spotify:String,
            soundcloud:String,
            twitter:String,
        },
        images:{
            avatar: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
            rest:[String]
        },
        description:String,
        label: { type: Schema.Types.ObjectId, ref: 'Label' }
    },
    {
        timestamps: true,
    }
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;
