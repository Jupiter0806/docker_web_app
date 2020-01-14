import * as bcrypt from "bcrypt";

const _saltRounds = 10;

export function encrypt(original: string): string {
  return bcrypt.hashSync(original, _saltRounds);
}

export function compare(original: string, encrypted: string): boolean {
  return bcrypt.compareSync(original, encrypted);
}
