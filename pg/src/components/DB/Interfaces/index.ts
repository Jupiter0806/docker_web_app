import { Users } from "./Users";

export * from "./User";
export * from "./Users";
export * from "./AuthProvider";
export * from "./Collection";
export * from "./Image";
export * from "./Permissions";
export * from "./Session";

export interface DB {
  users: Users;

  finalise: () => void;
}

export interface DBOptions {
  url: string;
}
