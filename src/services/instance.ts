export const URL_API = process.env.NEXT_PUBLIC_URL as string

export async function get<R = any>(url: string, query?: any) {
  try {
    const endpoint = new URL(`${URL_API}${url}`)
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        endpoint.searchParams.append(key, typeof value === "string" ? value : String(value))
      })
    }
    const response = await fetch(endpoint)

    const data = await response.json()

    return data as R
  } catch (e) {
    return {
      error: e,
    } as R
  }
}
