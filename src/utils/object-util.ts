export const objectUtil = {
    encode(obj = {}): {} {
        const encoded: {[key: string]: any} = {};
        for (const [k, v] of Object.entries(obj)) {
            encoded[k] = Buffer.from(
                typeof v === 'object' ? JSON.stringify(v) : String(v),
                'utf8'
            );
        }
        return encoded;
    },
    decode(headers = {}) {
        const decoded: {[key: string]: any} = {};
        for (const [k, v] of Object.entries(headers)) {
            if (!v) continue;
            const str = v.toString();
            try { decoded[k] = JSON.parse(str); } catch { decoded[k] = str; }
        }
        return decoded;
    },
};