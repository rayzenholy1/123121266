import * as Crypto from 'expo-crypto';

export async function hashPassword(password: string): Promise<string> {
  const salt = Crypto.randomUUID();
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    salt + password
  );
  return `${salt}:${hash}`;
}
