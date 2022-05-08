const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        title: String,
        date: Date,
        mainArtist:
        {
            type: Schema.Types.ObjectId,
            ref: 'Artist'
        },
        secondaryArtists:
            [{
                type: Schema.Types.ObjectId,
                ref: 'Artist'
            }],
        venue:
        {
            type: Schema.Types.ObjectId,
            ref: 'Venue'
        },
        isAproved: {
            MainArtist: Boolean,
            Venue: Boolean
        },
        creator: Object

    },
    {
        timestamps: true,
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;
