import type { VercelResponse, VercelRequest } from "@vercel/node"
import dayjs from "dayjs"
import dayjsLocaleZh from "dayjs/locale/zh-cn"
import superagent from "superagent"

function buildAPIURI(app_id: string, app_secret: string) {
  const qs = new URLSearchParams()
  qs.append('app_id', app_id)
  qs.append('app_secret', app_secret)
  qs.append('ignoreHoliday', 'false')
  const s = ' https://www.mxnzp.com/api/holiday/single/'
  return (time: string) => (s + time + '?' + qs.toString()).trim()
}

function nowDay() {
  const dt = new Date()
  return dayjs(dt).locale(dayjsLocaleZh).format('YYYYMMDD')
}

function buildStrArr2Str(s: string[] | string) {
  if (Array.isArray(s)) {
    return s.join('')
  }
  return s
}

export default async function currentDay(req: VercelRequest, res: VercelResponse) {
  const { date = nowDay() } = req.query ?? {}
  const uriFactor = buildAPIURI(process.env.app_id ?? '', process.env.app_secret ?? '')
  const uri = uriFactor(buildStrArr2Str(date))
  try {
    const get = await superagent.get(uri)
    const json = JSON.parse(get.text)
    if (json.code === 1) {
      res.json({
        type: 'success',
        data: json.data,
        message: json.msg
      })
    } else {
      res.json({
        type: 'error',
        message: json.msg
      })
    }
  } catch (e) {
    res.json({
      type: 'error',
      message: e.message,
    })
  }
}