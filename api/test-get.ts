import type { VercelResponse } from "@vercel/node";
import superagent from "superagent"

export default async function (_, res: VercelResponse) {
  const html = await superagent.get('https://www.google.com/')
  res.send(html.text)
}