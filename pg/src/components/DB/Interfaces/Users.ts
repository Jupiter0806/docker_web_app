import { Collection } from "./Collection";
import { User, UserFindOptions, UserUpdates } from "./User";

export interface Users extends Collection<User, UserFindOptions, UserUpdates> {
  initialNewSession: (id: string) => User;
}
