import tryDo from "mow-try-do"

export default async function superFetch<T extends {} = Record<string, any>>(api: string) {
  const url = '/api' + api;
  const response = await fetch(url);

  return tryDo<Error, T>(response.json.bind(response))
}