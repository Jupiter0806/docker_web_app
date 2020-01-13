import AuthProvider from "./AuthProvider";
import { Session } from "./Session";
import { Permissions } from "./Permissions";
import { Image } from "./Image";

export enum Role {
  SystemAdmin,
  ServiceClient,
  GeneralPublic,
  Visitor
}

export interface PublicProfile {
  name: string;
  email: string;
  userId: string; // which user this public profile belongs to

  avatar?: Image;
  introduction?: string;
}

export interface User {
  firstname: string;
  fullname?: string;
  id?: string; // could be email, phone number, or others depends on provider
  lastname?: string;
  password?: string; // encrypt password
  provider?: AuthProvider;
  role?: Role;
  mobileNumber?: string;
  address?: string;
  avatar?: Image;

  permissions?: Permissions;

  activeSession?: Session;
  sessions?: Array<Session>;

  publicProfile?: PublicProfile;
  openToPublic?: boolean;
}

export interface UserFindOptions {
  name: string;
}

export interface UserUpdates {
  name: string;
}
