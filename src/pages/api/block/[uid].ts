// src/pages/api/block/[uid].ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
    const uid = params.uid;

    const mockBlock = {
        aura_version: '0.1',
        model: 'GPT-4o',
        provider: 'OpenAI',
        prompt: 'Summarize the paper',
        timestamp: '2025-07-25T10:32Z',
        user_edit: true,
        content_hash: 'a0f4...dc82',
        license: 'CC-BY-4.0',
        notes: 'Sample block from local API',
        uid: uid,
    };

    if (uid?.startsWith('AURA-')) {
        return new Response(JSON.stringify(mockBlock), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ error: 'Block not found' }), {
            status: 404,
        });
    }
};
