import { simpleToken } from "./securityConst";
import { decryptUrl } from "./securityHelper";

interface Payload {
    [key: string]: any;
}

var key = decryptUrl(simpleToken);

function base64Encode(str: string): string {
    return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
            String.fromCharCode(parseInt(p1, 16))
        )
    );
}

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function generateSimpleToken(payload: Payload): Promise<string> {
    const jsonPayload = JSON.stringify(payload);
    const base64Payload = base64Encode(jsonPayload);
    const signature = await sha256(base64Payload + key);

    return `${base64Payload}.${signature}`;
}