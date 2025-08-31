import { normalizeText } from './normalize';
export function matchesListing(item, f) {
    if (f.q) {
        const q = normalizeText(f.q);
        const addr = normalizeText(item.address);
        if (!addr.includes(q)) return false;
    }
    if (f.areaFrom != null && item.area < f.areaFrom) return false;
    if (f.areaTo != null && item.area > f.areaTo) return false;
    if (f.roomsFrom != null && item.rooms < f.roomsFrom) return false;
    if (f.roomsTo != null && item.rooms > f.roomsTo) return false;
    return true;
}