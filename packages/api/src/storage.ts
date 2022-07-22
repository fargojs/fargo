export abstract class ZoteraStorage {
  abstract get(key: string): Promise<string | undefined>;
  abstract set(key: string, value: string): Promise<void>;
  abstract delete(key: string): Promise<void>;
}