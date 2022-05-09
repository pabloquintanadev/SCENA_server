const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
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
