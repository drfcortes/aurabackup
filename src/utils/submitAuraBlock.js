export default async function submitAuraBlock(block) {
    const res = await fetch('https://qyx30mhh90.execute-api.us-east-2.amazonaws.com/v1/storeAuraBlock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(block)
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("🛑 Registry error:", text);
        throw new Error('Error uploading block: ' + text);
    }

    const data = await res.json();
    return data;
}
