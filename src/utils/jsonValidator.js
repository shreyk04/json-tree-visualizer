export function validateJson(text) {
    if (!text.trim()) {
        return { ok: false, message: "Input is empty. Please paste or type JSON." };
    }

    try {
        const parsed = JSON.parse(text);
        const type = typeof parsed;
        if (parsed === null || (type !== "object" && !Array.isArray(parsed))) {
            return { ok: false, message: "Root JSON must be an object or array." };
        }
        return { ok: true, data: parsed };
    } catch (err) {
        return { ok: false, message: `Invalid JSON — ${err.message}` };
    }
}
