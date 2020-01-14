import User from "./User";
import { getDB, AuthProvider } from "../DB";
import { getPermissions, validateUserId, wrapResponse } from "./utils";
import { AppError, ErrorCode } from "../AppError";
import { ErrorHandler } from "../ErrorHandler";
import { login } from "../Login";
import { encrypt } from "../shared/Encrypt";

const _loggerText = "Register";

export async function register(body: object): Promise<object> {
  try {
    const user = User.fromJson(body);
    const db = getDB();
    const originalPwd = user.password;

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
      throw new AppError(
        "User ID should be a valid " + AuthProvider[user.provider],
        {
          isOperational: true,
          code: ErrorCode.INCORRECT_USER_ID,
          logger: _loggerText
        }
      );
    }

    if (await db.users.isExist(newUser.id)) {
      throw new AppError("User exists", {
        isOperational: true,
        code: ErrorCode.USER_EXIST,
        logger: _loggerText
      });
    }

    newUser.password = encrypt(newUser.password);

    await db.users.set(newUser);

    return await login({ userId: newUser.id, password: originalPwd });
  } catch (e) {
    if (e instanceof AppError) {
      ErrorHandler.handleError(e);
      return e.toResponse();
    }

    // TODO
    // use global error handler
    if (e.isJoi) {
      return { message: e.details.map(item => item.message) };
    }

    // mongoose save validation errors

    return e;
  }
}
