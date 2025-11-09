import { generateStrongPassword } from "./_utils.js";

export async function onRequest(context) {
  const password = generateStrongPassword();
  return new Response(password, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
