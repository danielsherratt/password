import { generateSimplePassword } from "./_utils.js";

export async function onRequest(context) {
  const password = generateSimplePassword();
  return new Response(password, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
