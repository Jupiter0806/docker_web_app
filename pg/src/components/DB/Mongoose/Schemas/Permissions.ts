import * as mongoose from "mongoose";

export const Reporting = new mongoose.Schema({
  access: {
    type: Boolean,
    required: true
  },
  downloading: {
    type: Boolean,
    required: true
  },
  uploading: {
    type: Boolean,
    required: true
  }
});

export const Permissions = new mongoose.Schema({
  editingSiteInfo: {
    type: Boolean,
    required: true
  },
  reporting: Reporting,
  inputOutputRecording: {
    type: Boolean,
    required: true
  },
  uploadingPhotos: {
    type: Boolean,
    required: true
  },
  comments: {
    type: Boolean,
    required: true
  }
});
