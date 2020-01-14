import * as mongoose from "mongoose";

export const Image = new mongoose.Schema({
  uri: String,
  base64Data: String,
  height: Number,
  width: Number
});
