const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        originArtist:
        {
            type: Schema.Types.ObjectId,
            ref: 'Artist'
        },
        originVenue:
        {
            type: Schema.Types.ObjectId,
            ref: 'Venue'
        },
        originLabel:
        {
            type: Schema.Types.ObjectId,
            ref: 'Label'
        },
        destination: {
            type: String,
        },
        textContent: {
            type: String,
        },
        answered: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema);

module.exports = Message;