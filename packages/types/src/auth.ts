export interface ZoteraAuth {
  initialize(): Promise<void> | void;
  login(username: string, password: string): Promise<void> | void;
  register?(username: string, password: string): Promise<void> | void;
  publish(): Promise<void> | void;
  unpublish(): Promise<void> | void;
  access?(): Promise<void> | void;
}
