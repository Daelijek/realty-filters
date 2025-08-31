export function normalizeText(s) {
    if (!s) return '';
    const t = String(s).toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
    try { return t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch { return t; }
}