import * as Joi from "@hapi/joi";

import User from "./User";
import { getDB, AuthProvider, Role } from "../DB";

export async function register(body: object): Promise<object> {
  try {
    const user = User.fromJson(body);
    return await getDB().users.set({
      firstname: user.firstname,
      id: user.userId,
      lastname: user.lastname,
      fullname: user.firstname + " " + user.lastname,
      password: user.password,
      provider: AuthProvider.Email,
      role: Role.SystemAdmin,
      permissions: {
        reporting: { access: true, downloading: true, uploading: true },
        comments: true,
        uploadingPhotos: true,
        editingSiteInfo: true,
        inputOutputRecording: true
      }
    });
  } catch (e) {
    if (e.isJoi) {
      return { message: e.details.map(item => item.message) };
    }

    // mongoose save validation errors

    return e;
  }
}
