import data from '@/components/data/real_estate.json';
export function getAllListings() {
    return (Array.isArray(data) ? data : []).map((x, i) => ({
        id: x.id ?? String(i + 1),
        area: Number(x.area) || 0,
        rooms: Number.isFinite(Number(x.rooms)) ? Number(x.rooms) : 0,
        address: String(x.address || ''),
        type: String(x.type || ''),
        image: String(x.image || '')
    }));
}