const { Schema, model } = require("mongoose");

const fanSchema = new Schema(
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
    role: {
      type: String,
      enum: ['Fan', 'Admin'],
      default: 'Fan'
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