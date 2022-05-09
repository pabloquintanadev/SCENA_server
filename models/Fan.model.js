const { Schema, model } = require("mongoose");

const fanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
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

const Fan = model("Fan", fanSchema);

module.exports = Fan;