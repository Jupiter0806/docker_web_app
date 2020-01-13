import { Users } from "./Users";

export * from "./User";
export * from "./Users";

export interface DB {
  users: Users;

  finalise: () => void;
}

export interface DBOptions {
  url: string;
}
