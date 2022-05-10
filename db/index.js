const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGODB_REMOTE || "mongodb+srv://Scena:templozen@scena.cfm1c.mongodb.net/ScenaBBDD";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
