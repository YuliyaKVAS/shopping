import {User} from "../../models/user.model";

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: User) {}
}

export class Logout {
  static readonly type = '[Auth] Logout'
}
