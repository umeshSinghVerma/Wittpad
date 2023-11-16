import { createOrUpdate, deleteUserById, getUserById, readAllUsers } from './db.js'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CreateToken = (email:string | null) => {
    if(email){
        return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '3d' })
    }
}

export async function POST(request: Request) {
    const body = await readRequestBody(request.body);
    const email = body.id;
    const password = body.password;
    let { success, data } = await getUserById(email)
    if (success) {
        if(data?.id){
            success = true;
        }else{
            success = false;
        }
    }
    if(success){
        if(data){
            const isValidPassword = await bcrypt.compare(password,data.password);
            if(isValidPassword){
                return Response.json({ success: true, token : CreateToken(email)})
            }else{
                return Response.json({success:false,message:'User already exists. Incorrect Password'},{status:400})
            }
        }
    }else{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const body = {
            id : email,
            password:hash
        }
        const { success } = await createOrUpdate(body);
        const token = CreateToken(email);
        if (success) {
            return Response.json({ success: success, token : CreateToken(email)})
        }
        else{
            return Response.json({ success: success, message: "Error" })
        }
    }



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
