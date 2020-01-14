import * as mongoose from "mongoose";

export const Session = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  startTimestamp: {
    type: Number,
    required: true
  },
  startTimeString: {
    type: String,
    required: true
  },
  endTimeStamp: Number,
  endTimeString: String,
  expiryTimestamp: Number,
  expiryTimeString: String,

  accessToken: {
    type: String,
    required: true
  },

  sourceDeviceID: String,
  sourceDeviceType: String,

  userId: {
    type: String,
    required: true
  },

  isActive: {
    type: Boolean,
    required: true
  },

  mobileNumber: String,
  verifyDigitalNumber: String,
  isVerified: String
});
