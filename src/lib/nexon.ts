const API_URL = process.env.NEXT_PUBLIC_NEXON_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_NEXON_API_KEY;

export async function _call(path: string, qs?: Record<string, string>) {
  try {
    const url = new URL(path, API_URL);
    url.search = new URLSearchParams(qs).toString();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY && { 'x-nxopen-api-key': API_KEY }),
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
