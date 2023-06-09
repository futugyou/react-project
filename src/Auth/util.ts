
import { Buffer } from 'buffer'
import randomBytes from "randombytes"
import shaJs from "sha.js"

export const b64toB64UrlEncoded = (str: string): string => {
  return str
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

export const generateCodeVerifier = () => {
  return b64toB64UrlEncoded(
    randomBytes(32).toString("base64")
  )
}

export const createCodeChallenge = (codeVerifier: string): string => {
  return b64toB64UrlEncoded(
    shaJs("sha256")
      .update(codeVerifier)
      .digest("base64")
  )
}

export const btoa = (str: string): string => {
  return Buffer.from(str.toString(), "utf-8").toString("base64")
}

export const toSnakeCase = (str: string): string => {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()
}

export const toUrlEncoded = (obj: any): string => {
  return Object.keys(obj)
    .map(
      (k) =>
        encodeURIComponent(toSnakeCase(k)) + '=' + encodeURIComponent(obj[k])
    )
    .join('&')
}
