import bcrypt from "bcrypt";
import crypto from "node:crypto";

import type { HTPasswdAlgorithms } from "@zotera/types";

import type { HTPasswdUser } from "./htpasswd";

export function parseHTPasswd(content: string): Record<string, HTPasswdUser> {
  return content.split(/[\r]?[\n]/).reduce((prev, line) => {
    const [user, pass, algorithm] = line.split(":").map(s => s.trim());
    if (user && pass) {
      prev[user] = {
        hash: pass,
        algorithm: algorithm as HTPasswdAlgorithms
      };
    }
    return prev;
  }, {} as Record<string, HTPasswdUser>);
}

export async function verify(
  password: string,
  hash: string,
  algorithm: HTPasswdAlgorithms
): Promise<boolean> {
  if (algorithm === "bcrypt") {
    return await bcrypt.compare(password, hash);
  }

  if (algorithm === "sha512" || algorithm === "sha256") {
    return crypto.createHash(algorithm).update(password).digest("base64") === hash;
  }
  return false;
}
