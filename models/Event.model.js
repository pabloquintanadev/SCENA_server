const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        title: String,
        date: Date,
        image: String,
        mainArtist:
        {
            type: Schema.Types.ObjectId,
            ref: 'Artist'
        },
        supportingArtists:
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
            mainArtistCheck: Boolean,
            venueCheck: Boolean
        },
        creator: Object,
        description: String
    },
    {
        timestamps: true,
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;
