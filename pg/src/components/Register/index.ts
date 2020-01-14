import * as Joi from "@hapi/joi";

import User from "./User";
import { getDB, AuthProvider, Role } from "../DB";
import { getPermissions, validateUserId } from "./utils";
import { AppError, ErrorCode } from "../AppError";
import { ErrorHandler } from "../ErrorHandler";

export async function register(body: object): Promise<object> {
  try {
    const user = User.fromJson(body);

    const newUser = {
      firstname: user.firstname,
      id: user.userId,
      lastname: user.lastname,
      fullname: user.firstname + " " + user.lastname,
      password: user.password,
      provider: user.provider,
      role: user.role,
      permissions: getPermissions(user.role),
      avatar: undefined
    };

    if (user.avatarUri) {
      newUser.avatar = { uri: user.avatarUri };
    } else {
      delete newUser.avatar;
    }

    if (!validateUserId(newUser.id, newUser.provider)) {
      const error = new AppError(
        "User ID should be a valid " + AuthProvider[user.provider],
        {
          isOperational: true,
          code: ErrorCode.INCORRECT_USER_ID,
          logger: "Register"
        }
      );

      ErrorHandler.handleError(error);

      return error.toResponse();
    }

    return await getDB().users.set(newUser);
  } catch (e) {
    // TODO
    // use global error handler
    if (e.isJoi) {
      return { message: e.details.map(item => item.message) };
    }

    // mongoose save validation errors

    return e;
  }
}
