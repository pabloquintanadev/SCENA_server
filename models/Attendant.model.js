const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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

const User = model("User", userSchema);

module.exports = User;