const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
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

const Event = model("Event", eventSchema);

module.exports = Event;

title, date, MainArtist(populated), REstArtists(populated), venue(populated), isAproved{ MainArtist(booleans), Venue(boolean) }, creator(currentUSer)