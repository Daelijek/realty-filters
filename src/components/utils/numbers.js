export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
export function parseDecimal(input, { min = 0 } = {}) {
    if (input == null || input === '') return null;
    const s = String(input).replace(',', '.').trim();
    if (!/^[+-]?\d*\.?\d+$/.test(s)) return NaN;
    const n = Number(s);
    return Number.isFinite(n) && n >= min ? n : NaN;
}
export function parseIntSafe(input, { min = 0 } = {}) {
    if (input == null || input === '') return null;
    const s = String(input).trim();
    if (!/^[+-]?\d+$/.test(s)) return NaN;
    const n = parseInt(s, 10);
    return Number.isInteger(n) && n >= min ? n : NaN;
}
export function swapIfReversed(a, b) { return (a != null && b != null && a > b) ? [b, a] : [a, b]; }