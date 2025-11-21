import fetch from "node-fetch";
import "dotenv/config";

async function test() {
  const res = await fetch(process.env.HF_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: "console.log('hello world')" }),
  });

  console.log(res.status, await res.text());
}

test();
