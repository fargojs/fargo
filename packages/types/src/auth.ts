export interface ZoteraAuth {
  init(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  register(): Promise<void>;
  publish(): Promise<void>;
  unpublish(): Promise<void>;
  access(): Promise<void>;
}
