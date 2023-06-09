import { generateCodeVerifier, createCodeChallenge } from './util'

export type PKCECodePair = {
  codeVerifier: string
  codeChallenge: string
  createdAt: Date
}

export const createPKCECodes = (): PKCECodePair => {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = createCodeChallenge(codeVerifier)
  const createdAt = new Date()
  const codePair = {
    codeVerifier,
    codeChallenge,
    createdAt
  }
  return codePair
}
