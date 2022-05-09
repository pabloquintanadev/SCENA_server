const { Schema, model } = require("mongoose");

const labelSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        description: String,
        duty:{
            type: String,
            enum: ['RecordLabel', 'Management']
        }
    },
    {
        timestamps: true,
    }
);

const Label = model("Label", labelSchema);

module.exports = Label

