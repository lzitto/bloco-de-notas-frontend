/**
 * Gera o hash SHA-256 (em hexadecimal) de um texto.
 * Usa a Web Crypto API do navegador. Funciona em localhost e em HTTPS.
 */
export async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
