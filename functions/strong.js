export async function onRequest(context) {
  const WORDS = [
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

  const BAD_SUBSTRINGS = [
    "ass","sex","xxx","porn","nude","naked","boob","jug","slut","prick",
    "dick","tit","cock","rape"
  ];
  const SYMBOLS = "!@#$%^&*";

  const hasBad = s => BAD_SUBSTRINGS.some(b => s.toLowerCase().includes(b));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const cap = w => w.charAt(0).toUpperCase() + w.slice(1);
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const safe = fn => {
    for (let i = 0; i < 50; i++) {
      const c = fn();
      if (!hasBad(c)) return c;
    }
    return "Safe" + rand(1000, 9999) + pick(SYMBOLS);
  };

  const password = safe(() => {
    const count = 3 + Math.floor(Math.random() * 2); // 3 or 4 words
    const parts = Array.from({ length: count }, () => cap(pick(WORDS)));
    const num = rand(100, 9999);
    const sym = pick(SYMBOLS);
    return Math.random() < 0.5
      ? parts.join("") + num + sym
      : parts[0] + num + parts.slice(1).join("") + sym;
  });

  return new Response(password, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
