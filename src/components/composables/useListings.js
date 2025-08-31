import { computed } from 'vue';
import { getAllListings } from '../services/listings';
import { matchesListing } from '../utils/match';

export function useListings(filters, sort) {
    const all = getAllListings();

    const filteredSales = computed(() => all.filter(i => i.type === 'Продажа').filter(i => matchesListing(i, filters)));
    const filteredRents = computed(() => all.filter(i => i.type === 'Аренда').filter(i => matchesListing(i, filters)));

    const sorted = (list) => {
        const s = sort.value;
        if (s === 'none') return list;
        const arr = list.slice();
        if (s === 'area_asc') arr.sort((a, b) => a.area - b.area);
        if (s === 'area_desc') arr.sort((a, b) => b.area - a.area);
        if (s === 'addr_asc') arr.sort((a, b) => String(a.address).localeCompare(String(b.address), 'ru', { sensitivity: 'base' }));
        if (s === 'addr_desc') arr.sort((a, b) => String(b.address).localeCompare(String(a.address), 'ru', { sensitivity: 'base' }));
        return arr;
    };

    return {
        sales: computed(() => sorted(filteredSales.value)),
        rents: computed(() => sorted(filteredRents.value))
    };
}