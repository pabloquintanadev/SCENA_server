const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'El nombre de usuario ya está registrado']
    },
    email: {
      type: String,
      unique: [true, 'El email ya está registrado']
    },
    password: String,
    avatar: {
      type: String,
      default: './../img/defaultImg.png'
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