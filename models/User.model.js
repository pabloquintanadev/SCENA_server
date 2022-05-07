const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username:String,
    email:String,
    password:String,
    avatar: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    likedEents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    likedArtists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    likedVenues: [{ type: Schema.Types.ObjectId, ref: 'Venue' }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;