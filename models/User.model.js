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
    networks: {
      instagram: { type: String },
      spotify: { type: String },
      soundcloud: { type: String },
      twitter: { type: String }
    },
    images: {
      avatar: {
        type: String,
        default: './../img/defaultImg.png'
      },
      others: [String]
    },
    role: {
      type:String,
      enum:['Attendant','Artist','Venue','Event','Label']
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;