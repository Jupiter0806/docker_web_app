import * as mongoose from "mongoose";

import * as Interfaces from "../../Interfaces";
import { Image } from "./Image";
import { Permissions } from "./Permissions";
import { Session } from "./Session";

export const PublicProfile = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },

  avatar: Image,
  introduction: String
});

export const User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  id: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  provider: {
    type: Number,
    required: true,
    enum: Object.values(Interfaces.AuthProvider)
  },
  role: {
    type: Number,
    required: true,
    enum: Object.values(Interfaces.Role)
  },
  mobileNumber: String,
  address: String,
  avatar: Image,

  permissions: {
    type: Permissions,
    required: true
  },

  activeSession: {
    type: Session,
    required: false
  },
  sessions: {
    type: [Session],
    required: false
  },

  publicProfile: PublicProfile,
  openToPublic: Boolean
});
