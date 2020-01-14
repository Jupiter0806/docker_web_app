import { validateEmail } from "ta-common";

import { Role, Permissions, AuthProvider } from "../DB";

export function getPermissions(role: Role): Permissions {
  switch (role) {
    case Role.SystemAdmin:
      return {
        editingSiteInfo: true,
        reporting: {
          access: true,
          downloading: true,
          uploading: true
        },
        inputOutputRecording: true,
        uploadingPhotos: true,
        comments: true
      };

    case Role.ServiceClient:
      return {
        editingSiteInfo: false,
        reporting: {
          access: true,
          downloading: false,
          uploading: true
        },
        inputOutputRecording: true,
        uploadingPhotos: false,
        comments: true
      };

    case Role.GeneralPublic:
      return {
        editingSiteInfo: false,
        reporting: {
          access: false,
          downloading: false,
          uploading: false
        },
        inputOutputRecording: true,
        uploadingPhotos: false,
        comments: true
      };

    case Role.Visitor:
    default:
      return {
        editingSiteInfo: false,
        reporting: {
          access: false,
          downloading: false,
          uploading: false
        },
        inputOutputRecording: false,
        uploadingPhotos: false,
        comments: false
      };
  }
}

export function validateUserId(id: string, provider: AuthProvider): boolean {
  switch (provider) {
    case AuthProvider.Email:
    default:
      return validateEmail(id);
  }
}
