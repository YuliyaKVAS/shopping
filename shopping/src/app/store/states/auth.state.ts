import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AuthService} from "../../services/auth.service";
import {Login} from "../actions/auth.actions";
import {tap} from "rxjs/operators";

export interface AuthStateModel {
  idToken: string | null,
  email: string | null
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    idToken: null,
    email: null
  }
})
export class AuthState {

  @Selector()
  static idToken(state: AuthStateModel): string | null {
    return state.idToken
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.idToken
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, { payload}: Login) {
    return this.authService.login(payload).pipe(
      tap((
        result: { idToken: string, email: string }
      ) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          idToken: result.idToken,
          email: result.email
        });
      })
    );
  }
}
