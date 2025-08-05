export abstract class Hasher {
  abstract compare(plain: string): Promise<boolean>
}