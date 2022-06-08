
import type { VercelRequest, VercelResponse } from "@vercel/node"

export default function test(req: VercelRequest, res: VercelResponse) {
  res.json({
    value: process.env.demo_env
  })
}