// Shared wordlist + helpers for password generation

export const WORDS = [
  "acorn","amber","apple","apricot","bamboo","beacon","berry","biscuit",
  "blossom","breeze","bridge","bright","bubble","cactus","camera","candle",
  "canyon","carrot","castle","cedar","cherry","citrus","clover","cloud",
  "coffee","coral","cotton","crystal","daisy","delta","desert","dolphin",
  "ember","emerald","feather","forest","fossil","frost","galaxy","garden",
  "ginger","glacier","granite","harbor","harvest","horizon","jasmine",
  "juniper","lantern","lemon","library","light","maple","meadow","mint",
  "moon","mountain","nebula","ocean","olive","onyx","orchard","owl","paper",
  "pebble","pepper","photon","pioneer","planet","plenty","pocket","prairie",
  "quiet","quartz","rain","raven","river","rocket","sage","sandstone",
  "shadow","silent","silver","solar","spark","spring","stable","star",
  "stone","summer","sunrise","sunset","thunder","timber","tower","valley",
  "velvet","violet","walnut","whisper","willow","winter","zenith"
];

// Substrings we don't want anywhere in the final password (lowercased).
export const BAD_SUBSTRINGS = [
  "ass","sex","xxx","porn","nude","naked","boob","jug","slut","prick",
  "dick","tit","cock","rape"
];

export const SYMBOLS = "!@#$%^&*";

export function hasBad(str) {
  const lower = str.toLowerCase();
  return BAD_SUBSTRINGS.some(bad => lower.includes(bad));
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function cap(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Retry wrapper to avoid bad substrings.
// If it somehow keeps failing, returns a safe fallback.
export function makeSafe(generatorFn, attempts = 50) {
  for (let i = 0; i < attempts; i++) {
    const candidate = generatorFn();
    if (!hasBad(candidate)) return candidate;
  }
  return "Safe" + rand(1000, 9999) + pick(SYMBOLS);
}

// Simple: 2 words + 2-digit number + 1 symbol
export function generateSimplePassword() {
  return makeSafe(() => {
    const w1 = cap(pick(WORDS));
    const w2 = cap(pick(WORDS));
    const num = rand(10, 99);
    const sym = pick(SYMBOLS);
    return `${w1}${w2}${num}${sym}`;
  });
}

// Strong: 3–4 words + 3–4 digit number + 1 symbol
export function generateStrongPassword() {
  return makeSafe(() => {
    const count = 3 + Math.floor(Math.random() * 2); // 3 or 4
    const parts = Array.from({ length: count }, () => cap(pick(WORDS)));
    const num = rand(100, 9999);
    const sym = pick(SYMBOLS);
    if (Math.random() < 0.5) {
      return parts.join("") + num + sym;
    }
    return parts[0] + num + parts.slice(1).join("") + sym;
  });
}
