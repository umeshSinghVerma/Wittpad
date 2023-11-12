import { createOrUpdate, deleteUserById, getUserById, readAllUsers } from './db.js'
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    console.log(email);
    const { success, data } = await getUserById(email)
    if (success) {
        if(data?.id){
            return Response.json({ success, data })
        }
        return Response.json({ success:false });
    }

    return Response.json({ success: false, message: "Error" })
}

export async function POST(request: Request) {
    const body = await readRequestBody(request.body);
    const { success } = await createOrUpdate(body);

    if (success) {
        return Response.json({ success });
    }

    return Response.json({ success: true, message: "Error" })
}

async function readRequestBody(body: ReadableStream | null): Promise<any> {
    if (body) {
        const reader = body.getReader();
        const chunks: Uint8Array[] = [];
        let result;

        while (!(result = await reader.read()).done) {
            chunks.push(result.value);
        }

        const buffer = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
        let offset = 0;
        chunks.forEach((chunk) => {
            buffer.set(chunk, offset);
            offset += chunk.length;
        });

        const text = new TextDecoder().decode(buffer);
        return JSON.parse(text);
    }
}
