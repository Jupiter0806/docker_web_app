import Credential from "./Credential";
import { getDB } from "../DB";
import { compare } from "../shared/Encrypt";
import { AppError } from "../AppError";
import { ErrorCode } from "../AppError";
import { ErrorHandler } from "../ErrorHandler";
import { wrapResponse } from "../shared/Response";

const _loggerText = "Login";

export async function login(body: object): Promise<object> {
  try {
    const credential = Credential.fromJson(body);
    const db = getDB();

    const user = await db.users.get(credential.userId);

    if (!compare(credential.password, user.password)) {
      throw new AppError("UserId and password not match", {
        isOperational: true,
        code: ErrorCode.USER_ID_PASSWORD_NOT_MATCH,
        logger: _loggerText
      });
    }

    return wrapResponse(
      {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        fullname: user.fullname,
        role: user.role,
        permissions: user.permissions
      },
      "user"
    );
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

    return e;
  }
}
