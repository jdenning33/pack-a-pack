'use server';
export async function fetchFromCorsUrl(url: string) {
    let results = await (await fetch(url)).json();
    return results;
}
