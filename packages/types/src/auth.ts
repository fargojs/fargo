export interface ZoteraAuth {
  init(): Promise<void>;
  login(): Promise<void>;
  logout(): Promise<void>;
}
