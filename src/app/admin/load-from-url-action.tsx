'use server';
export async function fetchFromCorsUrl(url: string) {
    const results = await (await fetch(url)).json();
    return results;
}
