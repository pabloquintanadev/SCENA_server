const { Schema, model } = require("mongoose");

const LabelSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        description: String,
        avatar: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
        role: ['Label', 'Management']
    },
    {
        timestamps: true,
    }
);

const Label = model("Label", LabelSchema);

module.exports = Label;

