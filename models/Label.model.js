const { Schema, model } = require("mongoose");

const labelSchema = new Schema(
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
        description: String,
        avatar: {
            type: String,
            default: './../img/defaultImg.png'
        },
        role: {
            type: String,
            enum: ['Label', 'Management']
        }

    },
    {
        timestamps: true,
    }
);

const Label = model("Label", labelSchema);

module.exports = Label

