import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

export type PKCECodePair = {
  codeVerifier: string
  codeChallenge: string
  createdAt: Date
}

export const base64URLEncode = (str: string): string => {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  } 

  const strr = String.fromCharCode.apply(null, new Uint16Array(buf) as any)
  return window.btoa(strr)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const sha256Encode = (str: string): string => {
  return Base64.stringify(sha256(str))
}

const randomBytes = (): string => { return Math.floor(Math.random() * Date.now()).toString(36) + Math.floor(Math.random() * Date.now()).toString(36) + Math.floor(Math.random() * Date.now()).toString(36) }

export const createPKCECodes = (): PKCECodePair => {
  const codeVerifier = randomBytes()
  const codeChallenge = base64URLEncode(sha256Encode(codeVerifier))
  const createdAt = new Date()
  const codePair = {
    codeVerifier,
    codeChallenge,
    createdAt
  }
  return codePair
}
