const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
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

const Artist = model("Artist", artistSchema);

module.exports = Artist;



username, email, password, styles(array), social networks(objeto), images{ avatar, rest }, description, label(populated)
