import { DynamicObject } from "@/app/types/dynamic-object";
import { simpleToken } from "./securityConst";
import { decryptUrl } from "./securityHelper";

interface Payload {
    [key: string]: any;
}

const key = decryptUrl(simpleToken);

// Function to generate a simple hash (for tamper detection)
function simpleHash(data: string, key: string): string {
    let hash = 0;
    const combined = data + key;
    for (let i = 0; i < combined.length; i++) {
        hash = (hash << 5) - hash + combined.charCodeAt(i);
        hash = hash & hash;
    }
    return hash.toString();
}

export function encrypt<T>(payload: DynamicObject<T>, expiresIn: number): string {
    const timestamp = Date.now();
    const expirationTime = timestamp + expiresIn;

    const dataToEncrypt = JSON.stringify({
        ...payload,
        timestamp: timestamp,
        expirationTime: expirationTime
    });

    // Generate a hash for the data
    const hash = simpleHash(dataToEncrypt, key);

    // Append the hash to the data
    const dataWithHash = JSON.stringify({
        data: dataToEncrypt,
        hash: hash
    });

    let result = "";
    for (let i = 0; i < dataWithHash.length; i++) {
        result += String.fromCharCode(dataWithHash.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }

    // Convert the result to hexadecimal for safer transport
    let hexResult = "";
    for (let i = 0; i < result.length; i++) {
        const hex = result.charCodeAt(i).toString(16);
        hexResult += ("00" + hex).slice(-2); // Ensure two-digit hexadecimal
    }

    return hexResult;
}

// Define a type for the decrypted data object
interface DecryptedData extends Payload {
    timestamp: number;
    expirationTime: number;
}

// Function to decrypt the text with tamper detection
export function decrypt(hexText: string): DecryptedData | null {
    try {
        let text = "";
        for (let i = 0; i < hexText.length; i += 2) {
            text += String.fromCharCode(parseInt(hexText.substr(i, 2), 16));
        }

        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }

        const parsedData = JSON.parse(result);

        // Verify the hash
        const expectedHash = simpleHash(parsedData.data, key);
        if (expectedHash !== parsedData.hash) {
            return null;
        }

        const decryptedData: DecryptedData = JSON.parse(parsedData.data);
        const currentTime = Date.now();
        const nextTime = currentTime + 60000;

        if (currentTime > decryptedData.expirationTime || nextTime < decryptedData.expirationTime) {
            return null;
        }

        return decryptedData;
    } catch (error) {
        return null;
    }
}