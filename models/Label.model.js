const { Schema, model } = require("mongoose");

const LabelSchema = new Schema(
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

const Label = model("Label", LabelSchema);

module.exports = Label;

username, email, password, description, images{ avatar, rest }, role['Label', 'Management']
